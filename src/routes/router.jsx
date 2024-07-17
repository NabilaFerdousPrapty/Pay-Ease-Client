import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./Private/PrivateRoute";
import Home from "../Pages/Home/Home";
import UserManagement from "../Pages/Admin/UserManagement/UserManagement";
import Logout from "../Pages/Logout/Logout";
import UserOverview from "../Pages/User/UserOverview/UserOverview";
import CashIn from "../Pages/User/CashIn/CashIn";
import CashOut from "../Pages/User/CashOut/CashOut";
import SendMoney from "../Pages/User/SendMoney/SendMoney";
import Balance from "../Pages/User/Balance/Balance";

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
      ///Admin routes
      {
        path:'/manage-users',
        element:<UserManagement/>
      },
      ///User routes
      {
         path:'/overview',
          element:<UserOverview/>
      },{
        path:'/cash-in',
        element:<CashIn/>
      },{
        path:'/cash-out',
        element:<CashOut/>
      },{
        path:'/send-money',
        element:<SendMoney/>
      },{
        path:"/balance",
        element:<Balance/>
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
