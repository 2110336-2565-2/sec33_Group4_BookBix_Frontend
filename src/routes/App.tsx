import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/_Navbar'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import ManageProfile from '../screens/ManageProfile'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
