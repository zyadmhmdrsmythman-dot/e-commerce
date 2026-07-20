import React, { useEffect, useState } from 'react'
import HeroSlider from '../../components/HeroSlider'
import SliderProduct from '../../components/sliderProduct/SliderProduct'
import SlideProductLoading from '../../components/sliderProduct/SlideProductLoading'
import PageTransition from '../../components/PageTransition'


const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
]


function Home() {

  const [products, setProducts] = useState({})
  const [loading, setloading] = useState(true)


  useEffect(()=>{
    const fetchProduct = async ()=>{
      try{
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            return{[category] : data.products}
          })
        )

        const productsData = Object.assign({}, ...results);
        setProducts (productsData)

      }catch (error){
        console.error("Error Fetching" , error);
      } finally{
        setloading (false)
      }
      

    }

    fetchProduct();
  },[])
  

  return (
    <PageTransition>
      <div>
      <HeroSlider/>

    {
      loading ?(
        categories.map((cat) => (
        <SlideProductLoading kay={cat} />

        ))
      ) : (

        categories.map((cat) => (
          
          <SliderProduct key={cat}
           data={products[cat]}
            title={cat.replace("-", " ")} />
        ))

      )
    }

      
    </div>
    </PageTransition>
  )
}

export default Home
