import { BASE_URL, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

export function getGroupsRequest(onlyMine = false) {
  return fetch(`${BASE_URL}/groups${onlyMine ? '?onlyMine=true' : ''}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}

export function getGroup(id, onlyMine = false) {
  return fetch(`${BASE_URL}/groups/${id}${onlyMine ? '?onlyMine=true' : ''}`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}

export function getGroupMembers(id) {
  return fetch(`${BASE_URL}/groups/${id}/members`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}

export function getGroupTasks(id) {
  return fetch(`${BASE_URL}/groups/${id}/tasks`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}

export function createGroup(data) {
  return fetch(`${BASE_URL}/groups`, {
    method: "POST",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}

export function editGroup(id, data) {
  return fetch(`${BASE_URL}/groups/${id}`, {
    method: "PUT",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}

export function addMembers(id, data) {
  return fetch(`${BASE_URL}/groups/${id}/members/add`, {
    method: "POST",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache",
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}
