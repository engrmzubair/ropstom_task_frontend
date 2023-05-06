import './App.css';
import { getRoutes } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(getRoutes());

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
