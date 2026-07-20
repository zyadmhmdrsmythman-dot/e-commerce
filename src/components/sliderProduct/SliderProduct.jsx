import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./Product";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import "./sliderProduct.css";

function SliderProduct({data , title}) {
  
  console.log(data);
  
  
    return (
    <>
      <div className="slide_products">
        <div className="container">
          <div className="top_slide">
            <h2>{title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae, nihil?
            </p>
          </div>

          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10, 
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {data.map((item)=>{
                return (

            <SwiperSlide>
              <Product item={item} />
            </SwiperSlide>
                )
            })}
            
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default SliderProduct;
