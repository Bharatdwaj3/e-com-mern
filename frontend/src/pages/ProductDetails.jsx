import React from 'react'
import {Footer} from '../components/layout/index'
import {Details} from '../components/Products/index'

const ProductDetails = () => {
  return (
    <>
      <div className="relative  h-[3000px] w-screen bg-sky-100 mt-[70px]">
        <Details/>
        <Footer/> 
      </div>
    </>
  )
}

export default ProductDetails