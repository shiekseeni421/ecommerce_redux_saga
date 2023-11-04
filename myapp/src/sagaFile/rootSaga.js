import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchData, addItems } from "./store";
import { sagAction } from "./sagAction";

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

export function* addItemCart(data) {
  yield put(addItems(data.item));
}

export default function* rootSaga() {
  yield takeEvery(sagAction.FETCH_DATA_SAGA, fetchDataSaga);
  yield takeEvery(sagAction.ADD_CART_ITEM, addItemCart);
}
