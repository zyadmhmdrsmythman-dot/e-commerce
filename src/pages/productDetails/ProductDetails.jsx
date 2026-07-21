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
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      
      // إذا كان المنتج غير موجود (404) أوقف العملية ولا تقم بعمل res.json()
      if (!res.ok) {
        throw new Error("Product not found");
      }

      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      setProduct(null); // تعيين المنتج كـ null لمنع ظهور Skeleton معلق
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
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
