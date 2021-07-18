import { API_URL } from "../env";

export const BASE_URL = API_URL;

const user = JSON.parse(localStorage.getItem('user'));
const token = user?.token;

export const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const REQUEST_HEADERS_WITH_AUTH = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`
};
