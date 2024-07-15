import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
      children:[
        {

        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },{
      path:'/signup',
      element:<SignUp/>
    }
  ]);
  export default router;