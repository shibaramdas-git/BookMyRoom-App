import './App.css'
import Navbar from './components/Navbar'
import Booknowscreen from './screens/Booknowscreen'
import Homescreen from './screens/Homescreen'
import Loginscreen from './screens/Loginscreen'
import Registerscreen from './screens/Registerscreen'
import Myaccountscreen from './screens/Myaccountscreen'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Adminscreen from './screens/Adminscreen'
import Landingscreen from './screens/Landingscreen'



function App() {
  return (
    <>
      <Navbar />
      <Router>
        
        <Routes>
        
          <Route path='/' element={<Landingscreen />} />
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:roomId/:fromDate/:toDate' element={<Booknowscreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />
          <Route path='/myaccount' element={<Myaccountscreen />} />
          <Route path='/admin' element={<Adminscreen />} />

        </Routes>

      </Router>
      
    </>  
  )
}

export default App
