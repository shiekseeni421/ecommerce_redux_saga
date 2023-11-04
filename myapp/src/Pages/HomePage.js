import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagAction } from "../sagaFile/sagAction";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products_array);

  useEffect(() => {
    dispatch({ type: sagAction.FETCH_DATA_SAGA });
  }, []);

  return (
    <div className="HomePage">
      <div className="card_container">
        {products.map((item, i) => {
          return (
            <div className="card_el">
              <img src={item.preview} alt="ecomerceLogo" />
              <p className="Item_name">{item.name}</p>
              <p>{item.price}</p>
              <button
                className="addButton"
                onClick={() => {
                  dispatch({ type: sagAction.ADD_CART_ITEM, item: item });
                }}
              >
                Add Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
