import { BASE_URL, REQUEST_HEADERS, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

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

export function getUsers() {
  return fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}
