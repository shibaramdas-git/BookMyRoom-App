import './App.css'
import Navbar from './components/Navbar'
import Booknowscreen from './screens/Booknowscreen'
import Homescreen from './screens/Homescreen'
import Loginscreen from './screens/Loginscreen'
import Registerscreen from './screens/Registerscreen'

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'


function App() {
  return (
    <>
      <Navbar />
      <Router>
        
        <Routes>
        
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:roomid/:fromDate/:toDate' element={<Booknowscreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />

        
        </Routes>

      </Router>
      
    </>  
  )
}

export default App
