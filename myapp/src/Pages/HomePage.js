import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagAction } from "../sagaFile/sagAction";

function HomePage() {
  const [cartCount, setCartCount] = useState({});
  const dispatch = useDispatch();
  const { products_array } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch({ type: sagAction.FETCH_DATA_SAGA });
  }, []);

  //Add Item to cart list
  const addItem = (id, price, name, preview) => {
    if (Object.keys(cartCount).includes(id)) {
      cartCount[id].count += 1;
      setCartCount(cartCount);
    } else {
      setCartCount({ ...cartCount, [id]: { count: 1 } });
    }
    dispatch({
      type: sagAction.ADD_CART_ITEM,
      item: { id: id, price: price, name: name, preview: preview },
    });
  };

  //Remove Item from cart list
  const removeItem = (id) => {
    if (Object.keys(cartCount).includes(id)) {
      if (cartCount[id].count > 1) {
        cartCount[id].count -= 1;
        setCartCount(cartCount);
      } else {
        delete cartCount[id];
        setCartCount(cartCount);
      }
    }
    dispatch({
      type: sagAction.REMOVE_CART_ITEM,
      id: id,
    });
  };

  return (
    <div className="HomePage">
      <div className="card_container">
        {products_array.map((item, i) => {
          return (
            <div className="card_el">
              <img src={item.preview} alt="ecomerceLogo" />
              <div className="cardItem">
                <p className="Item_name">{item.name}</p>
                <p>{item.price}</p>
              </div>
              {cartCount[item.id] ? (
                <div>
                  <button
                    onClick={() => {
                      addItem(item.id, item.price, item.name, item.preview);
                    }}
                    className="IncrementButton btn"
                  >
                    +
                  </button>
                  <span className="count_value">
                    {cartCount[item.id].count}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="DecBtn btn"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  className="addButton"
                  onClick={() => {
                    addItem(item.id, item.price, item.name, item.preview);
                  }}
                >
                  Add Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
