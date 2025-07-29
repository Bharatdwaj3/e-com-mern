import React from 'react'
import {Header, Footer,  Monarch, Clergy, Bourgouise} from '../components/index'

const Chrcts = () => {
  return (
    <>
      <div className="relative  h-[8000px] w-screen bg-sky-100 mt-[70px]">
        <Header/>     
        <Monarch/>
        <Clergy/>
        <Bourgouise/>
        <Footer/> 
      </div>
    </>
  )
}

export default Chrcts