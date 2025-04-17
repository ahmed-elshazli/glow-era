import React from 'react'
import Navbar from '../components/Uitily/Navbar'
import ProductDetails from "../components/Shop/ProductDetials";
import Footer from '../components/Uitily/Footer';
import Similar from '../components/Shop/Similar';

function ProductDetailsPage() {
  return (
    <>
          <Navbar />
      <ProductDetails />
      <Similar/>
      
    </>
  )
}

export default ProductDetailsPage
