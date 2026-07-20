import React, { useEffect, useState } from 'react';
import './header.css'
import { IoMdMenu, IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom'; 
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks = [
  {titel:"Home" , link:"/"},
  {titel:"About" , link:"/about"},
  {titel:"Accessories" , link:"/accessories"},
  {titel:"Blog" , link:"/blog"},
  {titel:"Content" , link:"/content"},
]

function BtmHeader() {

  const location = useLocation();
  const [category, setCategory] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(()=>{
    setIsCategoryOpen(false)
  },[location])

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then((data) => setCategory(data));
  }, []);

  console.log(isCategoryOpen);
  

  return (
    <div className='btm_header'>
      <div className="container">
        <nav className="nav">

          <div className="category_nav">
            <div className="category_btm" onClick={()=> setIsCategoryOpen(!isCategoryOpen)}>
              <IoMdMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>
            
            <div className={`category_nav_list ${isCategoryOpen ? "active" : "" }`}>
              {category.map((cat) => (
                <Link key={cat.slug} to={`/category/${cat.slug}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
              
          <div className="nav_links">
            {NavLinks.map((item) => (
              <li key={item.link} className={location.pathname === item.link ?
               "active" : ""}>
                <Link key={item.link} to={item.link}>
                {item.titel}
              </Link>
              </li>
            ))}
          </div>
        </nav>

        <div className="sign_regs_icon">
          <Link to="/">
            <PiSignInBold />
          </Link>
          <Link to="/">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BtmHeader;