import { useEffect, useState, createContext } from 'react'
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
import { UserProvider } from '../hooks/CustomProvider'

const mockUser: UserInterface = {
  _id: '1',
  username: 'jewjew',
  role: 'provider',
}

const URL = import.meta.env.VITE_API_URL

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-management" element={<ManageLocation />} />
          <Route path="/location-booking/:locationId" element={<BookLocation />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Routes>
    </UserProvider>
  )
}

export default App
