import http from "./httpService";

export function getCategories() {
  return http.get("http://localhost:4000/categories");
}
