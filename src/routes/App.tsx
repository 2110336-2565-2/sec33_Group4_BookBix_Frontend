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
  CreatePromotion,
  LocationsManage,
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
          <Route path={RoutePath.CreatePromotion} element={<CreatePromotion />} />
          <Route>
            <Route path="/locations" element={<LocationsManage />} />
            <Route path="/locations/create" element={<CreateLocation />} />
            <Route path="/locations/:locationId" element={<ChangeLocation />} />
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
