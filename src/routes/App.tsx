import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import BookLocation from '../screens/BookLocation'
import Register from '../screens/Register'
import ManageProfile from '../screens/ManageProfile'
import ForgetPassword from '../screens/ForgetPassword'
import ResetPassword from '../screens/ResetPassword'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route
            path="/location-booking/:locationId"
            element={<BookLocation />}
          />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
