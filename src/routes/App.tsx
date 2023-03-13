import { useEffect, useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SearchPage from '../screens/customer/Search'
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
  Bookings,
} from '../screens/index'
import { UserProvider } from '../hooks/CustomProvider'

const mockUser: UserInterface = {
  _id: '1',
  username: 'jewjew',
  role: 'provider',
}

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/profile-management" element={<ManageProfile />} />
          <Route path="/location-management" element={<ManageLocation />} />
          <Route path="/me/bookings" element={<Bookings />} />
          <Route path="/location-booking/:locationId" element={<BookLocation />} />
          <Route path="/location-booking/:locationId" element={<BookLocation />} />
          <Route path="*" element={<Home />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        {/* Down Here is for easy test */}
        <Route path="/customers/:customerId/history" element={<LoggedInHistory />} />
      </Routes>
    </UserProvider>
  )
}

export default App
