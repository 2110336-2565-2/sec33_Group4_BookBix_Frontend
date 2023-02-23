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

const URL = import.meta.env.VITE_API_URL

function App() {
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    // fetch to get user info
    // if user is logged in, set user info in context
    async function getUserInfo() {
      const response = await fetch(`${URL}/users/me`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data)
        console.log(data)
      }
    }


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
        {/* <Route path="/profile-management" element={<ManageProfile />} />
        <Route path="/location-management" element={<ManageLocation />} /> */}
      </Routes>
    </>
  )
}

export default App
