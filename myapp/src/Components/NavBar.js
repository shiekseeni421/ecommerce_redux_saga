import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Shop_Log from "../assets/Shop_Log.png";

function NavBar() {
  let navigate = useNavigate();
  const count = useSelector((state) => state.products.add_count);

  return (
    <nav className="nav_bar">
      <img src={Shop_Log} alt="EcomerceLogo" className="Log_img" />
      <div
        onClick={() => {
          navigate("/addcart");
        }}
        className="Cart_Container"
      >
        <div className="Count_Value">
          <p>{count}</p>
        </div>
        <ShoppingCartOutlined style={{ fontSize: "30px" }} />
      </div>
    </nav>
  );
}

export default NavBar;
