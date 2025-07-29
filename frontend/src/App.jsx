import { Bourgouise, Monarch, Navbar, Clergy} from './components/index';
import {Home, About, Community, Chrcts} from './pages/index';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import InsertDB from './components/InsertDB'

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/> }/>  
           <Route path='/monarchs' element={<Monarch/>}/>  
           <Route path='/clergy' element={<Clergy/>}/>  
           <Route path='/bourgouise' element={<Bourgouise/>}/>  
            <Route path='/char' element={<Chrcts/>}/>  
          <Route path='/community' element={<Community/>}/>            
          <Route path='/about' element={<About/>} />
          <Route path='/test' element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/insert' element={<InsertDB/>} />
          <Route/>  
        </Routes>
      </Router> 
    </>
  )
}

export default App
