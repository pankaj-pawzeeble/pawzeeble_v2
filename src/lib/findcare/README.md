# Find Care + booking API layer

HTTP client, typed models, services and booking orchestration for the V2 API. No UI. Anything the API contract left unspecified is marked `TODO` in the code.

```
apiClient.ts       createApiClient: base URL, auth header, envelope unwrapping, typed errors, unsafe-payload guard
config.ts          V2 base URL + stored token (default wiring only)
errors.ts          ApiError, UnsafePayloadError, NotFoundError, ValidationError
models.ts          every type in the contract
clinicService.ts   search, global search, clinic detail, branches, doctor services, coupons
bookingService.ts  booking context, pet registration, create appointment, payment retry, post-booking rules
index.ts           default instances (`clinicService`, `bookingService`) + re-exports
```

```ts
import { searchClinics, resolveClinicDetailTarget, confirmBooking } from '@/lib/findcare';
```

For tests or custom wiring use the factories: `createApiClient({ getBaseUrl, getToken, fetchImpl })`, `createClinicService(api)`, `createBookingService(api)`.

## Conventions

- Base URL: `NEXT_PUBLIC_V2_BASE_URL` (dev: `https://dev-apiv2.pawzeeble.com/`). In the browser under `next dev` the existing `/v2-proxy` rewrite is used (CORS).
- `Authorization: <raw token>` (no `Bearer`). Calls marked "no auth" send an empty `Authorization`.
- Responses are unwrapped from `{ success, message, data }` to `data`.
- Non-2xx → `ApiError` with the server message. No response → `ApiError("Something Went Wrong")`.
- POST/PATCH bodies containing HTML/script tags throw `UnsafePayloadError` before anything is sent.
- Times are HHmm integers (`1000` = 10:00).

## Functions → endpoints

| Function | Method | Endpoint | Auth |
| --- | --- | --- | --- |
| `searchClinics` | GET | `businesses` (`lat, lng, distances=10000, page, size=8, q?, entType=clinic, oc?`) | yes |
| `globalSearch` | GET | `master-search/global-search` (`q, searchType, page, limit`) | yes |
| `resolveClinicDetailTarget` | – | pure: slug if `businessPageUrlRoute && businessPageActive`, else id | – |
| `getClinicById` | GET | `businesses/{clinicId}?page&size` | no |
| `getClinicBySlug` | GET | `businesses/business-page-settings/{slug}?page&size` (inactive page → `NotFoundError`) | no |
| `getBranches` | GET | `businesses/ent-relations/{clinicId}`, then `businesses/ent-relations-child/{clinicId}` only if the first is empty | no |
| `getDoctorServices` | GET | `v1/businesses/{clinicId}/doctors/{doctorId}/services` | yes |
| `getClinicCoupons` | GET | `businesses/{clinicId}/coupons` | yes |
| `getServiceVariant` | GET | `facilities/{serviceId}` | yes |
| `loadBookingContext` | GET ×4 (parallel) | `users/cn/me` (yes), `v1/appointments/slots/docs/{doctorId}/ents/{clinicId}` (yes), `payment-gateways/payment-details/{clinicId}/{doctorId}[?service_id]` (yes), `appointments/symptoms` (no) | mixed |
| `getPetCoupons` | GET | groomer: `pets/{petId}/coupons-usage/bId/{clinicId}`; clinic consultation: `…/dId/{doctorId}`; clinic other: `…/dId/{doctorId}?facilityId={serviceId}` | yes |
| `ensurePetRegistered` | GET, POST | `enterprises/clients/{userId}/enterprises/{clinicId}`; `pet-enterprise-details/register` only if the pet is missing or has no `enterprisePetId` | yes* |
| `confirmBooking` | GET, POST, POST | `ensurePetRegistered`, then `appointments` (plan holder, or Clinic/QR page) or `appointments/from-pp` (Business page) | yes* |
| `retryPayment` | POST | `payment-gateways/orders` | yes |
| `getAppointment` | GET | `appointments/{appointmentId}` | yes* |
| `revertToCancel` | PATCH | `appointments/{appointmentId}/revert-to-cancel` (body `{}`) | yes* |
| `getRewardCoupon` | GET | `appointments/{appointmentId}/random-coupon` | yes* |
| `handlePostBookingState` | PATCH / GET | `Frozen` and payment ≠ `Success` → `revertToCancel`; payment `Success` → `getRewardCoupon` | yes* |

\* The contract does not state auth for these; they are sent authenticated (`TODO` in code).

Pure helpers in `bookingService.ts`: `selectAppointmentEndpoint`, `buildAppointmentPayload`, `resolveConsultationFee`, `buildRegisterPetBody`, `buildCheckoutOptions` (Cashfree `{ paymentSessionId, returnUrl }`; the SDK call itself is left to the UI layer).

## Open questions (all marked `TODO` in code)

- `seconadaryBreed` is kept misspelled in the register body, as the existing web app sends it.
- `preAppointmentDetails.reason` is `" "` for plan-holder/groomer bookings, with the text in `visitDetails.description`, as written in the contract.
- `timeslots` sends the selected `whSlots` objects as-is (including `available`); the contract example shows only `st`/`et`.
- How "active Protect plan" / "pet has plan" are derived, how an enterprise pet is matched to `petId`, and response shapes for coupons, `users/cn/me` and `apptNo` are not specified.
- A 2xx response with `success: false` is passed through unchanged.

## Tests

```
npm test
```

Mocked-`fetch` tests live in `__tests__/`: payload building (omitted fields, fee zeroing), endpoint selection (plan / Business / QR), pagination append + `hasMore`, branch fallback, error mapping, unsafe-payload guard and the post-booking rules.
