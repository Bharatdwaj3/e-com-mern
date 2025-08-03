import {Clothing, Essential, Gadgets} from './components/Products/index'
import { Navbar } from './components';
import {Home, About, Community, Chrcts} from './pages/index';
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
            <Route path='/gadgets' element={<Gadgets/>}/>  
            <Route path='/essential' element={<Essential/>}/>  
            <Route path='/clothing' element={<Clothing/>}/>  
            <Route path='/char' element={<Chrcts/>}/>  
            <Route path='/community' element={<Community/>}/>            
            <Route path='/about' element={<About/>} />
            <Route path='/test' element={<Login/>} />
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
