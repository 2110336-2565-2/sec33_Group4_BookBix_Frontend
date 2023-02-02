import { Route, Routes } from 'react-router-dom'
import Navbar from './components/_Navbar'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Register from './screens/Register'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
