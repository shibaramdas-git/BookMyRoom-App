import './App.css'
import { Navbar } from './components/Navbar'
import { BooknowScreen } from './screens/BooknowScreen'
import Homescreen from './screens/Homescreen'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <>
      <Navbar />
      <Router>
        
        <Routes>
        
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:roomid' element={<BooknowScreen />} />
        
        </Routes>

      </Router>
      
    </>  
  )
}

export default App
