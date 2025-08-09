import React from 'react'
import {Header, Footer} from '../components/index'
import { Clothing, Essential, Gadgets } from '../components/Products/index'


const Product = () => {
  return (
    <>
      <div className="relative  h-[8000px] w-screen bg-sky-100 mt-[70px]">
        <Header/>     
        <Gadgets/>
        <Essential/>
        <Clothing/>
        <Footer/> 
      </div>
    </>
  )
}

export default Product