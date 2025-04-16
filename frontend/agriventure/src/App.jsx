import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddListing from './pages/AddListing'
import { useState } from 'react'

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [role,setRole]=useState("USER")
  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated }  role={role}/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated}  setIsAuthenticated={setIsAuthenticated} setRole={setRole}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/AddListing" element={<AddListing/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
