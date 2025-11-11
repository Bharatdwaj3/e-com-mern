import React from 'react'
import { Footer, Cart} from '../components/layout/index'

const CartPage = () => {
  return (
    <>
      <div className="relative  h-[2000px] w-screen bg-sky-100 mt-[70px]">
        <Cart/>
        <Footer/> 
      </div>
    </>
  )
}

export default CartPage