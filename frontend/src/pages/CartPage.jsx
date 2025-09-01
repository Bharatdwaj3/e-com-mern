import React from 'react'
import { Footer} from '../components/index'
import Cart from '../components/Cart'

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