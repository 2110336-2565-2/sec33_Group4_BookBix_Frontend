export enum RoutePath {
  SearchPage = '/',
  ManageProfile = '/profile-management',
  ManageLocation = '/location-management',
  Bookings = '/me/bookings',
  BookLocation = '/location-booking/:locationId',
  NotFound = '*',
  Register = '/register',
  Login = '/login',
  ForgetPassword = '/resetpassword',
  ResetPassword = '/auth/reset-password/:id',
  LoggedInHistory = '/customers/:customerId/history',
}
