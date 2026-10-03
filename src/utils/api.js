export const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

export default async function fetchJSON(path, options = {}) {
  const fetchOptions = {
    ...options,
    credentials: options.credentials || "include",
  };
  const res = await fetch(`${API_BASE}${path}`, fetchOptions);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}