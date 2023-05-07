import './App.css';
import { getRoutes } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(getRoutes());

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
