const API_BASE_URL = "/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const finalUrl = `${API_BASE_URL}${path}`;
  const finalOptions = {
    ...options,
    headers,
  };

  return fetch(finalUrl, finalOptions);
}
