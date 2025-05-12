import Header from '../components/Home/Header'
import Navbar from '../components/Uitily/Navbar'
import Banner from '../components/Home/Banner'
import CategorySearschBar from '../components/Home/CategorySearschBar'
import CategoryNavbar from '../components/Home/CategoryNavbar'
import ProductGrid from '../components/Home/ProductGrid'
import TopSelling from '../components/Home/TopSelling'
import About from '../components/Home/About'
import CustomerReviews from '../components/Home/CustomerReviews'
import Footer from '../components/Uitily/Footer'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Landing() {
const [skinType, setSkinType] = useState("");
 
  const location = useLocation();

  useEffect(() => {
      if (location.state?.scrollTo) {
          const section = document.getElementById(location.state.scrollTo);
          if (section) {
              setTimeout(() => {
                  section.scrollIntoView({ behavior: "smooth" });
              }, 100); // تأخير بسيط لضمان تحميل المحتوى
          }
      }
  }, [location.state]);

  
  return (
      <>
          <Navbar />
          <Header skinType={skinType} setSkinType={setSkinType} />

          <Banner />
          <CategorySearschBar />
          <CategoryNavbar />
          <ProductGrid selectedCategory={skinType} />
          <TopSelling />
          <About />
          <CustomerReviews />
          <Footer />
      </>
  );
}

export default Landing
