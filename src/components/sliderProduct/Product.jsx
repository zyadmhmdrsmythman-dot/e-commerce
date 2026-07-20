import React, { useContext } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { FaCartArrowDown,FaRegHeart, FaShare  } from "react-icons/fa";
import './sliderProduct.css'
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";



function Product({item}) {
  
  const navigate = useNavigate()

  const { cartItem, addToCart, addToFavrites, Favorites, removeFromFavorites } = useContext(CartContext);

  const isInCart = cartItem.some(i => i.id === item.id );

  const handleaddTocart = () =>{
    addToCart(item)

    toast.success(
      <div className="toast-wrapper">
        <img src={item.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{item.title}</strong>
          Added To Cart Success
          <div>
            <button className="btn" onClick={()=> navigate('/cart') }>View Cart</button>
          </div>
        </div>
      </div>
      ,{duration : 3500}
    )
  }

  //Favorites

  const isInFav = Favorites.some(i => i.id === item.id );


  const handelAddToFav = () =>{
    if (isInFav) {
      removeFromFavorites(item.id)
      toast.error(`${item.title} Removed From Favorites`)

    }else{
      addToFavrites(item)
      toast.success(`${item.title} added To Favorites`)

    }
    
  }
  

  return (
    <>
      <div className={`product ${isInCart ? 'in-cart' : ''}`}>
        <Link to={ `/products/${item.id}` }>

        <span className="status_cart"><FaCheck />in cart</span>
        
        <div className="img_product">
          <img
            src={item.images[0]}
            alt="phone"
          />
        </div>

        <p className="name_product">{item.title}</p>
        
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />
        </div>

        <p className="price"><span>$ {item.price}</span></p>
        
        </Link>
        
        <div className="icons">
          <span className="btn_addtocart"  onClick={ handleaddTocart }><FaCartArrowDown /></span>
          <span className={`${isInFav ? 'in-fav' : ''}`} onClick={handelAddToFav}><FaRegHeart /></span>
          <span><FaShare /></span>
        </div>
      </div>
    </>
  );
}

export default Product;
