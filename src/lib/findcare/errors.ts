/** Server (non-2xx) or transport failure. `status` is undefined when no response was received. */
export class ApiError extends Error {
  readonly status?: number;
  readonly body?: unknown;

  constructor(message: string, status?: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/** A POST/PATCH payload contained an HTML/script tag and was rejected before being sent. */
export class UnsafePayloadError extends ApiError {
  readonly path: string;

  constructor(path: string) {
    super('Payload contains HTML or script content');
    this.name = 'UnsafePayloadError';
    this.path = path;
  }
}

/** The requested clinic page does not exist or is inactive. */
export class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/** Caller supplied input that cannot be turned into a valid request. */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
