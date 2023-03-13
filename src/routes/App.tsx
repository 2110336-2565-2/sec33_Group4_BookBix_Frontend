import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { UserInterface } from '../interfaces/user.interfaces'
import {
  Home,
  Login,
  Profile,
  BookLocation,
  Register,
  ManageProfile,
  ManageLocation,
  ForgetPassword,
  ResetPassword,
  LoggedInHistory,
  Bookings
} from '../screens/index'

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
    console.log('fetch Data')
    // fetchUser()
  }, [])

  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-management" element={<ManageLocation />} />
          <Route path="/me/bookings" element={<Bookings/>} />
          <Route
            path="/location-booking/:locationId"
            element={<BookLocation />}
          />
          <Route path="/location-booking/:locationId" element={<BookLocation />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        {/* Down Here is for easy test */}
        <Route path="/customers/:customerId/history" element={<LoggedInHistory />} />
      </Routes>
    </>
  )
}

export default App