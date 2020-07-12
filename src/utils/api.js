export const BASE_URL = "http://localhost:8080/api";

const token = localStorage.getItem('token');

export const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const REQUEST_HEADERS_WITH_AUTH = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`
};
