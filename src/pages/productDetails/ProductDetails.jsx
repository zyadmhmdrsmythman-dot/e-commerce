import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

import SliderProduct from "../../components/sliderProduct/SliderProduct";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProductLoading from "../../components/sliderProduct/SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loadingRelatedProduct, setLoadingRelatedProduct] = useState(true);

  useEffect(() => {
    const fechProduct = async () => {
      try {
        const res = await fetch(`https:dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fechProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetch(`https:dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProduct(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingRelatedProduct(false));
  }, [product?.category]);



  if (loading) return <ProductDetailsLoading />;
  if (!product) return <h3>Product Not Found </h3>;

  return (
    <PageTransition key={id}>
      <>
      {loading ? (
        <ProductDetailsLoading />
      ) : (
        <div className="item_details">
          <div className="containar">
            <ProductImages product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      )}

      {loadingRelatedProduct ? (
        <SlideProductLoading />
      ) : (
        <SliderProduct
          key={product.category}
          data={relatedProduct}
          title={product.category.replace("-", " ")}
        />
      )}
    </>
    </PageTransition>
  );
}

export default ProductDetails;
