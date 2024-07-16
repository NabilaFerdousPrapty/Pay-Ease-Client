import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./Private/PrivateRoute";
import Home from "../Pages/Home/Home";
import UserManagement from "../Pages/Admin/UserManagement/UserManagement";
import Logout from "../Pages/Logout/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/manage-users',
        element:<UserManagement/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },{
    path: "/logout",
    element: <Logout />,
  }
]);

export default router;
