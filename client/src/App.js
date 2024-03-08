import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './components/Signup/Signup';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import './App.css';
import Add_Post from "./components/Add_Post/Add_Post";
import Personel from "./components/Personel/Personel";

function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/forgot_password",
      element: <ForgotPassword/>
    },
    {
      path: "/reset_password/:token",
      element: <ResetPassword/>
    },
    {
      path: "/add_post",
      element: <Add_Post/>
    },
    {
      path: "/personel",
      element: <Personel/>
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
