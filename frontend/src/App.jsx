import {Clothing, Essential, Gadgets, Details} from './components/Products/index'
import { Navbar } from './components';
import {Home, About, Product} from './pages/index';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import InsertDBGadgets from './components/InsertDBGadgets'
import InsertDBClothing from './components/InsertDBClothing';
import InsertDBEssentials from './components/InsertDBEssentials';


function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
            
            <Route path='/product/gadgets' element={<Gadgets/>}/>
            <Route path='/product/gadgets/:id' element={<Details/>}/>    
            
            <Route path='/product/essential' element={<Essential/>}/>
            <Route path='/product/essential/:id' element={<Details/>}/>    
            
            <Route path='/product/clothing' element={<Clothing/>}/>  
            <Route path='/product/clothing/:id' element={<Details/>}/>  
            
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
