import { BASE_URL, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

export function getGroupsRequest() {
  return fetch(`${BASE_URL}/groups`, {
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