import App from "../App";

import Dashboard from "../pages/dashboard";
import ErrorPage from "../pages/errorPage";
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


];
