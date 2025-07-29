import React from 'react'
//import { useNavigate } from 'react-router-dom'
import {Header, Footer, Content} from '../components/index'
import AuthComponent from '../components/AuthComponent'
//import { isAuthenticated } from '../utils/auth'

const Login = () => {

  return (
    <>
      <div className="relative  h-[8000px] w-screen bg-sky-100 mt-[70px]">
        <Header/>     
        <AuthComponent/>
        <Footer/> 
      </div>
    </>
  )
}

export default Login