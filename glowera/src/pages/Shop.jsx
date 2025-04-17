import React from 'react'
import Navbar from '../components/Uitily/Navbar'
import Footer from '../components/Uitily/Footer'
import Search from '../components/Shop/Search'
import ShopPage from '../components/Shop/ShopPage'

function Shop() {
  return (
    <>
          <Navbar />
      {/* <Search /> */}
      <ShopPage />
      <Footer/>
    </>
  )
}

export default Shop
