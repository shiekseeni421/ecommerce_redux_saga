import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchData, addItems, removeItems } from "./store";
import { sagAction } from "./sagAction";
import store from "./store";

let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchDataSaga() {
  try {
    let result = yield call(() =>
      callAPI({
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
        method: "GET",
      })
    );
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: "Products_FETCH_FAILED" });
  }
}

export function* addItemCart(items) {
  let { id, price, name, preview } = items.item;
  let { cart_items } = store.getState().products;
  let data = [...cart_items];
  let count = 0;
  let objValue = null;

  console.log(data, "store");
  if (data.length === 0) {
    data.push({ id: id, qty: 1, price: price, name: name, preview: preview });
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        count++;
        objValue = i;
        break;
      }
    }
    if (count === 1) {
      data[objValue] = {
        id: id,
        qty: data[objValue].qty + 1,
        price: price,
        name: name,
        preview: preview,
      };
    } else {
      data.push({ id: id, qty: 1, price: price, name: name, preview: preview });
    }
  }
  yield put(addItems(data));
}

export function* deleteCartItem(items) {
  console.log(items);
  let { cart_items } = store.getState().products;
  let data = [...cart_items];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].id, items.id);
    if (data[i].id === items.id) {
      if (data[i].qty === 1) {
        data.splice(i, 1);
      } else {
        data[i] = {
          id: data[i].id,
          qty: data[i].qty - 1,
          price: data[i].price,
          name: data[i].name,
          preview: data[i].preview,
        };
        console.log();
      }
      break;
    }
  }
  // console.log(data, "delete data");

  yield put(removeItems(data));
}

export default function* rootSaga() {
  yield takeEvery(sagAction.FETCH_DATA_SAGA, fetchDataSaga);
  yield takeEvery(sagAction.ADD_CART_ITEM, addItemCart);
  yield takeEvery(sagAction.REMOVE_CART_ITEM, deleteCartItem);
}
