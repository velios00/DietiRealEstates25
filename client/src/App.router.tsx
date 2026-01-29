import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home.page";
import RegisterPage from "./pages/Register/Register.page";
import LoginPage from "./pages/Login/Login.page";
import Agency from "./pages/Agency/Agency.page";
import SearchEstates from "./pages/SearchEstates/SearchEstates.page";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.page";
import EstateView from "./pages/EstateView/EstateView.Page";
import { AuthGuard } from "./shared/components/AuthGuard/AuthGuard";
import { Roles } from "./shared/enums/Roles.enum";

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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/agency/:id",
        element: <Agency />,
      },
      {
        path: "/search-estates",
        element: <SearchEstates />,
      },
      {
        path: "/admin",
        element: (
          <AuthGuard allowedRoles={[Roles.ADMIN]}>
            <AdminDashboard />
          </AuthGuard>
        ),
      },
      {
        path: "/estate/:idEstate",
        element: <EstateView />,
      },
    ],
  },
]);
