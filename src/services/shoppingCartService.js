import http from "./httpService";

const url = "http://localhost:4000/cart";

export function createCart() {
  return http.post(url + "/", {
    createdDate: new Date().getTime()
  });
}
