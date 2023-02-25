import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import BookLocation from '../screens/BookLocation'
import Bookings from '../screens/BookingsSummary'
import Register from '../screens/Register'
import ManageProfile from '../screens/ManageProfile'
import ManageLocation from '../screens/provider/ManageLocation'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-management" element={<ManageLocation />} />
          <Route path="/user/bookings" element={<Bookings/>} />
          <Route
            path="/location-booking/:locationId"
            element={<BookLocation />}
          />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile-management" element={<ManageProfile />} />
        <Route path="/location-management" element={<ManageLocation />} /> */}
      </Routes>
    </>
  )
}

export default App
