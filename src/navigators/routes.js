import {
  LandingPage,
  NotFound,
  Users,
  UserProfile
} from "./components";

const routes = [
  {
    path: "/*",
    element: <NotFound />,
    requireAuth: true,
  },
  {
    path: "/loggedin/users",
    element: <Users />,
    requireAuth: true,
  },
  {
    path: "/loggedin/users/:userId",
    element: <UserProfile />,
    requireAuth: true,
  },
  {
    path: "/",
    element: <LandingPage />,
    requireAuth: false,
  },
];
export default routes;
