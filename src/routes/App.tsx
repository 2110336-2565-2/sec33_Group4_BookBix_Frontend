import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import BookLocation from '../screens/BookLocation'
import Register from '../screens/Register'
import ManageProfile from '../screens/ManageProfile'
import ManageLocation from '../screens/provider/ManageLocation'
import { UserInterface } from '../interfaces/user.interfaces'
import ForgetPassword from '../screens/ForgetPassword'
import ResetPassword from '../screens/ResetPassword'

const URL = import.meta.env.VITE_API_URL

function App() {
  const [user, setUser] = useState<UserInterface | null>(null)
  // fetch user info
  const fetchUser = async () => {
    const response = await fetch(`${URL}/me`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const data: UserInterface = await response.json()
      if (response.ok) {
        setUser(data)
        console.log(`fetch user is ${data}`)
      }
  }
  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-management" element={<ManageLocation />} />
          <Route
            path="/location-booking/:locationId"
            element={<BookLocation />}
          />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        {/* <Route path="/profile-management" element={<ManageProfile />} />
        <Route path="/location-management" element={<ManageLocation />} /> */}
      </Routes>
    </>
  )
}

export default App
