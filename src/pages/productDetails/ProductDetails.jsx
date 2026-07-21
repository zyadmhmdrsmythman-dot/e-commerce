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

  // 1️⃣ جلب بيانات المنتج الرئيسي
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 2️⃣ جلب المنتجات الشبيهة
  useEffect(() => {
    if (!product || !product.category) return;

    setLoadingRelatedProduct(true); // إرجاع حالة التحميل لتحديث السلايدر عند تغيير المنتج

    // ✅ تم تصحيح رابط الهيدر وتزويده بـ //
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch category");
        return res.json();
      })
      .then((data) => {
        // استبعاد المنتج الحالي من قائمة المنتجات الشبيهة لعدم تكراره
        const filtered = (data.products || []).filter((item) => item.id !== product.id);
        setRelatedProduct(filtered);
      })
      .catch((error) => console.error("Category Fetch Error:", error))
      .finally(() => setLoadingRelatedProduct(false));
  }, [product?.id, product?.category]);

  if (loading) return <ProductDetailsLoading />;

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h3>Product Not Found ⚠️</h3>
        <p>The product you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <PageTransition key={id}>
      <>
        <div className="item_details">
          <div className="containar">
            <ProductImages product={product} />
            <ProductInfo product={product} />
          </div>
        </div>

        {loadingRelatedProduct ? (
          <SlideProductLoading />
        ) : (
          <SliderProduct
            key={product.id}
            data={relatedProduct}
            title={product.category ? product.category.replace("-", " ") : "Related Products"}
          />
        )}
      </>
    </PageTransition>
  );
}

export default ProductDetails;