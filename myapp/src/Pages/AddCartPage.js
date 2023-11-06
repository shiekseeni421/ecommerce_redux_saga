import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function AddCartPage() {
  let navigate = useNavigate();

  const cart_items = useSelector((state) => state.products.cart_items);
  const [newItem, setNewItem] = useState([]);

  return (
    <div>
      <div className="HomePage">
        <div className="card_container">
          {cart_items?.map((item) => (
            <div className="card_el">
              <img src={item.preview} alt="ecomerceLogo" />
              <div className="cardItem">
                <p className="Item_name">Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Item Total Count :{item.qty}</p>
                <p>Total Price: {item.price * item.qty}</p>
              </div>
            </div>
          ))}
          <p></p>
        </div>
      </div>
      <p>
        Total Item Score:
        {cart_items.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.qty * currentValue.price;
        }, 0)}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="Submit_Button"
      >
        Submit
      </button>
    </div>
  );
}

export default AddCartPage;
