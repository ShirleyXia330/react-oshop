import http from "./httpService";
import _ from "lodash";

const url = "http://localhost:4000/cart";

export function createCart() {
  const createdDate = new Date().getTime();
  http.post(url + "/", {
    id: createdDate
  });
  return createdDate;
}

export async function Increment(cartId, product) {
  const { data } = await getCart(cartId);
  let items = data[0].items;
  if (!items) {
    const item = { ...product, numberInCart: 1 };
    items = item;
  } else {
    const index = _.findIndex(items, { _id: product._id });
    if (index === -1) {
      const item = { ...product, numberInCart: 1 };
      items.push(item);
    } else {
      const item = items[index];
      item.numberInCart++;
      items.splice(index, 1, item);
    }
  }
  return changeCart(cartId, { id: cartId, items: items });
}

export async function Decrement(cartId, product) {
  const { data } = await getCart(cartId);
  let items = data[0].items;
  const index = _.findIndex(items, { _id: product._id });
  const item = items[index];

  if (item.numberInCart <= 1) _.remove(items, { _id: product._id });
  else {
    item.numberInCart--;
    items.splice(index, 1, item);
  }

  return changeCart(cartId, { id: cartId, items: items });
}

export function clearCart(cartId) {
  return changeCart(cartId, { id: cartId, items: new Array() });
}

export function getCart(id) {
  return http.get(url + "/" + id);
}

export function changeCart(cartId, items) {
  return http.put(url + "/" + cartId, items);
}
