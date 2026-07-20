import React from 'react'

function ProductImages({product}) {
  return (
    <div className="imgs_item">
                 <div className="big_img">
                   <img id="big_img" src={product.images[0]} alt={product.title} />
                 </div>
    
                 <div className="sm_img">
                   {product.images.map((img, index) => (
                     <img
                       key={index}
                       src={img}
                       alt={product.title}
                       onClick={() => (document.getElementById("big_img").src = img)}
                     />
                   ))}
                 </div>
               </div>
  )
}

export default ProductImages
