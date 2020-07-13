import { BASE_URL, REQUEST_HEADERS_WITH_AUTH } from "../utils/api";

export function getStages() {
  return fetch(`${BASE_URL}/stages`, {
    method: "GET",
    headers: REQUEST_HEADERS_WITH_AUTH,
    cache: "no-cache"
  }).then((response) => {
    return response.json();
  });
}