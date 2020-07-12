import { BASE_URL, REQUEST_HEADERS } from "../utils/api";

export function loginRequest(data) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: REQUEST_HEADERS,
    body: JSON.stringify(data),
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}
