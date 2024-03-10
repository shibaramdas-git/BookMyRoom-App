import './App.css'
import { Navbar } from './components/Navbar'
import Homescreen from './screens/Homescreen'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'





function App() {
  return (
    <>
      <Navbar />
      <Router>
        
        <Routes>
        
          <Route path='/home' element={<Homescreen />} />
        
        </Routes>

      </Router>
      
    </>  
  )
}

export default App
