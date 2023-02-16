import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../screens/Home'
import Login from '../screens/Login'
// import Logout from '../screens/Logout'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import ManageProfile from '../screens/ManageProfile'
import ManageLocation from '../screens/provider/ManageLocation'
import BookLocation from '../screens/BookLocation'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-booking/:locationId" element={<BookLocation/>} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
