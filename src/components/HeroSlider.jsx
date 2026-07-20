import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

import hero1 from "../img/banner_Hero1.jpg";
import hero2 from "../img/banner_Hero2.jpg";
import hero3 from "../img/banner_Hero3.jpg";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

function HeroSlider() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="content">
                <h4>Introuducing the new</h4>
                <h3>
                  Microsoft xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero1} alt="Slider herro" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introuducing the new</h4>
                <h3>
                  Microsoft xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero2} alt="Slider herro" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="content">
                <h4>Introuducing the new</h4>
                <h3>
                  Microsoft xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src={hero3} alt="Slider herro" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
