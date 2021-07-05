import { BASE_URL, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

export function getTasksRequest(onlyMine = false) {
  return fetch(`${BASE_URL}/tasks${onlyMine ? '?onlyMine=true' : ''}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}

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

export function editTask(id, data, onlyMine = false) {
  return fetch(`${BASE_URL}/tasks/${id}${onlyMine ? '?onlyMine=true' : ''}`, {
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

export function getMyStudentsTasks() {
  return fetch(`${BASE_URL}/tasks/my-students`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}