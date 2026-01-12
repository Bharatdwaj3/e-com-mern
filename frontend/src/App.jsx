import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ProductDetails, ProductGrid} from './components/products/index';
import  {Navbar}  from './components/layout/index';
import {Home, About} from './pages/index';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import {Login, Signup} from './components/auth/index';
import {Cart} from './components/layout/index';


import CustomerProfile from './components/customer/customerProfile';
import SellerProfile from './components/seller/SellerProfile';
import Checkout from './components/payment/checkout';

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path='/' element={<Home/> }/>  
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/product' element={<ProductGrid/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>    
          <Route path='/about' element={<About/>} />
          <Route path='/customer' element={<CustomerProfile/> }/>    
          <Route path='/order-success' element={<CustomerProfile/> }/> 
          <Route path='/seller' element={<SellerProfile/> }/>      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App
