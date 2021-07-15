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

export function getUsers(onlyMine = false) {
  return fetch(`${BASE_URL}/users${onlyMine ? '?onlyMine=true' : ''}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}

export function getUser(id, onlyMine = false) {
  return fetch(`${BASE_URL}/users/${id}${onlyMine ? '?onlyMine=true' : ''}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}

export function createUser(data) {
  return fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: REQUEST_HEADERS_WITH_AUTH,
    body: JSON.stringify(data),
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}

export function editUser(id, data) {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: REQUEST_HEADERS_WITH_AUTH,
    body: JSON.stringify(data),
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}

export function logoutUser() {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
  }).then((response) => {
    return response.json();
  });
}
