import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./rootSaga";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products_array: [],
    add_count: 0,
    cart_items: [],
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        products_array: action.payload,
        add_count: 0,
        cart_items: [],
      };
    },
    addItems: (state, action) => {
      return {
        products_array: state.products_array,
        add_count: state.add_count + 1,
        cart_items: [...state.cart_items, action.payload],
      };
    },
  },
});
export const { fetchData, addItems } = productSlice.actions;

//Store elements
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
