import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home.page";
import RegisterPage from "./pages/Register/Register.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
