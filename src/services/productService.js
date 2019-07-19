import http from "./httpService";

const url = "http://localhost:4000/products";

export function getProduct(id) {
  return http.get(url + "/" + id);
}

export function getProducts() {
  return http.get(url);
}

export function saveProduct(product) {
  if (product._id) {
    const data = { ...product };
    delete data._id;
    return http.put(url + "/" + product._id, data);
  }

  return http.post(url + "/", product);
}

export function deleteProduct(id) {
  return http.delete(url + "/" + id);
  // return http.delete("http://localhost:4000/products/5d3153bae1b4a63ea4e308f9");
}
