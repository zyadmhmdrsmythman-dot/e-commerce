import React from "react";
import Topheader from "./components/header/Topheader.jsx";
import BtmHeader from "./components/header/BtmHeader.jsx";
import Home from "./pages/home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import NotFound from "./pages/notFind.jsx";
import Cart from "./pages/cart/Cart.jsx";
import toast,{ Toaster } from "react-hot-toast";
import ScrollToTop from "./components/sliderProduct/ScrollToTop.jsx";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./components/CategoryPage/CategoryPage.jsx";
import SearchReslt from "./pages/SearchReslt.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
      <header>
        <Topheader />
        <BtmHeader />
      </header>

<Toaster position="bottom-right" reverseOrder={false} toastOptions={{
  style:{
    background:'#c9c9c9',
    borderRadius:'5px',
    padding:'14px'
  }
}} />

  <ScrollToTop />
    <AnimatePresence mode="wait">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchReslt />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="*" element={<NotFound/>} />
        
      </Routes>
    </AnimatePresence>
      
    </>
  );
}

export default App;
