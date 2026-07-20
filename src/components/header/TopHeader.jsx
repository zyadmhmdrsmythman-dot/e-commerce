import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../img/Logo.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./header.css";
import { CartContext } from "../context/CartContext";
import SearchBox from "./SearchBox";

function Topheader() {
  const { cartItem, Favorites } = useContext(CartContext);

  return (
    <div className="top_header">
      <div className="container">
        <Link className="logo" to="/">
          <img src="/Ecommerce/img/Logo.png" alt="Logo" />
        </Link>

        <SearchBox />

        <div className="header_icons">
          <div className="icon">
            <Link to={"/favorites"}>
              <FaRegHeart />
              <span className="count">{Favorites.length}</span>
            </Link>
          </div>
          <div className="icon">
            <Link to={"/cart"}>
              <TiShoppingCart />
              <span className="count">{cartItem.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topheader;
