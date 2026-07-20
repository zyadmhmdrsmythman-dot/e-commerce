import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

    //favorites
    const [Favorites, setFavorites] = useState(() => {
    const saveFav = localStorage.getItem("FavoritesItem");
    return saveFav ? JSON.parse(saveFav) : [];
  });

  const addToFavrites = item =>(
    setFavorites((prev)=>{
        if(prev.some((i) => i.id === item.id )) return prev;
        return [...prev, item]
    })
  )

  useEffect(()=>{
    localStorage.setItem("FavoritesItem", JSON.stringify(Favorites))
  },[Favorites])

  const removeFromFavorites = (id) =>{
    setFavorites((prev)=> prev.filter((i) => i.id !== id))
  }


  //cart
  const [cartItem, setCartItem] = useState(() => {
    const saveCart = localStorage.getItem("cartItem");
    return saveCart ? JSON.parse(saveCart) : [];
  });

  // increaseQuantity

  const increaseQuantity = (id) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  //decreaseQuantity

  const decreaseQuantity = (id) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  //RemoveCart

  const RemoveCart = (id) => {
    setCartItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (product) => {
    setCartItem((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);

      if (isExist) {
        return prevItems;
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        RemoveCart,
        addToFavrites,
        Favorites,
        removeFromFavorites
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
