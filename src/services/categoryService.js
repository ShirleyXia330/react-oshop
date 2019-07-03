import axios from "axios";

export function getCategories() {
  return axios.get("http://localhost:4000/categories");
}
