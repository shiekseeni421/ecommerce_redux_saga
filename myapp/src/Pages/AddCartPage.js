import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function AddCartPage() {
  let navigate = useNavigate();

  const cart_items = useSelector((state) => state.products.cart_items);
  const [newItem, setNewItem] = useState([]);

  let get_data = () => {
    let data = [...new Set(cart_items)];
    let new_array = [];
    for (let i = 0; i < data.length; i++) {
      let count = 0;
      for (let j = 0; j < cart_items.length; j++) {
        if (data[i]["id"] === cart_items[j]["id"]) {
          count += 1;
        }
      }
      new_array.push({
        id: data[i]["id"],
        count: count,
        price: data[i]["price"],
        preview: data[i]["preview"],
        name: data[i]["name"],
        Total_price: data[i]["total_price"] * count,
      });
    }
    setNewItem(new_array);
  };

  useEffect(() => {
    get_data();
  }, [1]);

  return (
    <div>
      <div className="HomePage">
        <div className="card_container">
          {newItem?.map((item) => (
            <div className="card_el">
              <img src={item.preview} alt="ecomerceLogo" />
              <p className="Item_name">Name: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Item Total Count :{item.count}</p>
              <p>Total Price: {item.price * item.count}</p>
            </div>
          ))}
          <p></p>
        </div>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "blue",
          color: "white",
          width: "100px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default AddCartPage;
