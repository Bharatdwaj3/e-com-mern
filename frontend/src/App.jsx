import {Clothing, Essential, Gadgets} from './components/Products/index'
import ProductDetails from './pages/ProductDetails';
import  Navbar  from './components/Navbar';
//import CartP from './components/Cart';
import {Home, About, Product} from './pages/index';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import InsertDBGadgets from './components/InsertDBGadgets'
import InsertDBClothing from './components/InsertDBClothing';
import InsertDBEssentials from './components/InsertDBEssentials';
import CartPage from './pages/CartPage';


function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/product/gadgets' element={<Gadgets/>}/>
            <Route path='/product/gadgets/:id' element={<ProductDetails/>}/>    
            
            <Route path='/product/essential' element={<Essential/>}/>
            <Route path='/product/essential/:id' element={<ProductDetails/>}/>    
            
            <Route path='/product/clothing' element={<Clothing/>}/>  
            <Route path='/product/clothing/:id' element={<ProductDetails/>}/>  
            
            <Route path='/product' element={<Product/>}/>       
            
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/inC' element={<InsertDBClothing/>} />
            <Route path='/inE' element={<InsertDBEssentials/>} />
            <Route path='/inG' element={< InsertDBGadgets/>} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App
