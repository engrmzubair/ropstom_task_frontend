import App from "../App";
import Cars from "../pages/cars";
import Categories from "../pages/categories";

import Dashboard from "../pages/dashboard";
import ErrorPage from "../pages/errorPage";
import Login from "../pages/login";
import Signup from "../pages/signup";



export const getRoutes = () => [
    {
        path: "/",
        element: <Dashboard />,

        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <Signup />,

    },
    {
        path: "/login",
        element: <Login />,

    },
    {
        path: "/categories",
        element: <Categories />,

    },
    {
        path: "/cars",
        element: <Cars />,

    },


];
