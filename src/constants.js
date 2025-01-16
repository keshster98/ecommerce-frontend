// Assign the main ecommerce_backend URL to API_URL
// NODE_ENV stores either "development" or "production"
export const API_URL =
  process.env.NODE_ENV === "development"
    ? "https://localhost:5555/api"
    : "https://b13-keshen24.mak3r.dev/api";
