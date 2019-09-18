import http from "./httpService";

const url = "http://localhost:4000/orders";

export function getOrdersByUser(id) {
  return http.get(url + "/" + id);
}

export function getOrders() {
  return http.get(url);
}

export function saveOrder(order) {
  return http.post(url + "/", order);
}
