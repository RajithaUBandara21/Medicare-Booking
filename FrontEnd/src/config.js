// Falls back to the local backend so dev keeps working with no .env changes;
// set VITE_API_BASE_URL once this frontend is deployed so it stops pointing at localhost.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
// Do not export a `token` snapshot here - localStorage.getItem('token') at module
// load time goes stale the moment the user logs in/out without a full page reload.
// Read localStorage.getItem('token') at the point each request is made instead.