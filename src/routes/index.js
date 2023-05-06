import App from "../App";

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


];
