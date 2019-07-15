import http from "./httpService";

const url = "http://localhost:4000/auth";

export function login(username, password) {
  return http.post(url, { username, password });
}
