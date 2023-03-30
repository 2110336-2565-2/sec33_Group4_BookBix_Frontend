import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  NotFound,
  Login,
  BookLocation,
  ManageProfile,
  Bookings,
  Register,
  ForgetPassword,
  ResetPassword,
  LoggedInHistory,
  SearchPage,
  ProfileProvider,
  CreateLocation,
  ChangeLocation,
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
          <Route path={RoutePath.Bookings} element={<Bookings />} />
          <Route path={RoutePath.BookLocation} element={<BookLocation />} />
          <Route>
            <Route path={RoutePath.ProfileProvider} element={<ProfileProvider />} />
            <Route path={RoutePath.CreateLocation} element={<CreateLocation />} />
            <Route path={RoutePath.ChangeLocation} element={<ChangeLocation />} />
          </Route>
        </Route>
        <Route path={RoutePath.Register} element={<Register />} />
        <Route path={RoutePath.Login} element={<Login />} />
        <Route path={RoutePath.ForgetPassword} element={<ForgetPassword />} />
        <Route path={RoutePath.ResetPassword} element={<ResetPassword />} />
        <Route path={RoutePath.LoggedInHistory} element={<LoggedInHistory />} />
        <Route path={RoutePath.NotFound} element={<NotFound />} />
      </Routes>
    </UserProvider>
  )
}

export default App
