import React from 'react'
import {Header, Footer, Content} from '../components/layout/index'

const Home = () => {
  return (
    <>
      <div className="relative  h-[3000px] w-screen bg-sky-100 mt-[70px]">
        <Header/>     
        <Content/>
        <Footer/> 
      </div>
    </>
  )
}

export default Home