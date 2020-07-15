import { BASE_URL, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

export function createTask(data) {
  return fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}

export function editTask(id, data) {
  return fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}

export function getTask(id) {
  return fetch(`${BASE_URL}/tasks/${id}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}