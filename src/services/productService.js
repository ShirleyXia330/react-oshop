import axios from "axios";

const url = "http://localhost:4000/products";

export function getProduct(id) {
  return axios.get(url + "/" + id);
}

export function saveProduct(product) {
  if (product._id) {
    const data = { ...product };
    delete data._id;
    return axios.put(url + "/" + product._id, data);
  }

  return axios.post(url + "/add", product);
}
