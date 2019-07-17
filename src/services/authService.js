import http from "./httpService";

import jwtDecode from "jwt-decode";

const url = "http://localhost:4000/auth";
const key = "token";

export async function login(username, password) {
  const { data: jwt } = await http.post(url, { username, password });
  localStorage.setItem(key, jwt);
}

export function saveToken(jwt) {
  localStorage.setItem(key, jwt);
}

export function logout() {
  localStorage.removeItem(key);
}

export function getUser() {
  const jwt = localStorage.getItem("token");

  if (jwt) return jwtDecode(jwt);
  return null;
}
