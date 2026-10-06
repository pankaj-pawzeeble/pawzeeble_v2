import axios from 'axios';

/** Shared HTTP client. Set NEXT_PUBLIC_API_URL when the backend is available. */
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 15000,
});
