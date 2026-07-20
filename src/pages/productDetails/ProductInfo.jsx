import React, { useContext } from 'react'
import { FaRegHeart, FaShare, FaStar, FaStarHalf } from 'react-icons/fa6'
import { TiShoppingCart } from 'react-icons/ti'
import { CartContext } from '../../components/context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductInfo({product}) {


    const { cartItem, addToCart,addToFavrites, Favorites, removeFromFavorites } = useContext(CartContext);
    const navigate = useNavigate()

    const isInCart = cartItem.some(item => item.id === product.id);


    const handleaddTocart = () =>{

    addToCart(product)

    toast.success(
      <div className="toast-wrapper">
        <img src={product.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{product.title}</strong>
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

  const isInFav = Favorites.some(i => i.id === product.id );


  const handelAddToFav = () =>{
    if (isInFav) {
      removeFromFavorites(product.id)
      toast.error(`${product.title} Removed From Favorites`)

    }else{
      addToFavrites(product)
      toast.success(`${product.title} added To Favorites`)

    }
    
  }


    
  return (
    <div className="details_item">
             <h1 className="name">{product.title}</h1>
             <div className="stars">
               <FaStar />
               <FaStar />
               <FaStar />
               <FaStar />
               <FaStarHalf />
             </div>
             <p className="price">$ {product.price}</p>

             <h5>
               Availability : <span>{product.availabilityStatus}</span>
             </h5>
             <h5>
               Brand : <span>{product.brand}</span>
             </h5>
             <p className="desc">{product.description}</p>
             <h5 className="stock">
               Hurry Up! Only <span>{product.stock}</span> products left in stock
             </h5>
             <button onClick={handleaddTocart} className={`btn ${isInCart ? 'in-cart' : ''}`} disabled={isInCart}>
                  {isInCart? "item in cart" : "Add  to cart"} <TiShoppingCart />
             </button>

             <div className="icons">
               <span className={`${isInFav ? 'in-fav' : ''}`} onClick={handelAddToFav}>
                 <FaRegHeart />
               </span>
               <span>
                 <FaShare />
               </span>
             </div>
           </div>
  )
}

export default ProductInfo
