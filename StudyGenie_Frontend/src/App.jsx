import React from "react";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ModelPage from "./pages/ModelPage";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

function App ()
{
    const Approuter = createBrowserRouter([
        {
            path:'/',
            element:<LandingPage/>
        },
        {
            path:'/model',
            element:<ModelPage />
        },
        {
            path:'/signin',
            element:<SignIn />
        },
        {
            path:'/login',
            element:<Login />
        }

    ])
    return (
        <RouterProvider router={Approuter} future={{ v7_startTransition: true,}}/>
  )
}
export default App

