import http from "./httpService";

const url = "http://localhost:4000/users";

export function registerUser(user) {
  return http.post(url + "/", {
    username: user.username,
    password: user.password,
    email: user.email
  });
}
