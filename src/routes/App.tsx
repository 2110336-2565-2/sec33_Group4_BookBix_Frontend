import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Home,
  Login,
  Profile,
  BookLocation,
  Bookings,
  Register,
  ManageProfile,
  ManageLocation,
  ForgetPassword,
  ResetPassword,
  LoggedInHistory,
  SearchPage,
} from '../screens/index'
import { UserProvider } from '../hooks/CustomProvider'
import { RoutePath } from '../interfaces/route.interface'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={RoutePath.SearchPage} element={<SearchPage />} />
          <Route path={RoutePath.ManageProfile} element={<ManageProfile />} />
          <Route path={RoutePath.ManageLocation} element={<ManageLocation />} />
          <Route path={RoutePath.Bookings} element={<Bookings />} />
          <Route path={RoutePath.BookLocation} element={<BookLocation />} />
          <Route path={RoutePath.Home} element={<Home />} />
        </Route>
        <Route path={RoutePath.Register} element={<Register />} />
        <Route path={RoutePath.Login} element={<Login />} />
        <Route path={RoutePath.ForgetPassword} element={<ForgetPassword />} />
        <Route path={RoutePath.ResetPassword} element={<ResetPassword />} />
        <Route path={RoutePath.LoggedInHistory} element={<LoggedInHistory />} />
      </Routes>
    </UserProvider>
  )
}

export default App
