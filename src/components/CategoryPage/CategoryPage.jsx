import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../sliderProduct/Product';
import './Categorypage.css'
import SlideProductLoading from '../sliderProduct/SlideProductLoading';
import PageTransition from '../PageTransition';

function CategoryPage() {


    const {category} = useParams()
    console.log(category);

    const [CategoryProduct , setCategoryProduct] = useState([])
    const [ loading, setLoading ] = useState(true)


    useEffect(()=> {
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res)=> res.json())
        .then((data) =>{
            setCategoryProduct(data.products)
        })
        .catch((error) => console.error(error))
        .finally(()=> setLoading(false))
    },[category])

    console.log(CategoryProduct);
    
    return (
       <PageTransition key={category}>
         <div className="category_products">
            {loading ? (
                <SlideProductLoading kay={category} />
            ) : (
                <div className="container">
                    <div className="top_slide">
                        <h2>{category} : {CategoryProduct.length}</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Repudiandae, nihil?
                        </p>
                    </div>
                    <div className="products">
                        {CategoryProduct.map((item, index) => (
                            <Product item={item} key={index} />
                            ))}
                    </div>
                </div>
            )}
        </div>
       </PageTransition>
    );
}

export default CategoryPage;
