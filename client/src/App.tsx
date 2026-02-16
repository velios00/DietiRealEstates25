import { useCallback, useState, useEffect } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./shared/models/JwtPayload.model";
import { getCurrentUser } from "./services/UserService";
import { UserContext } from "./shared/context/UserContext";
import { Roles } from "./shared/enums/Roles.enum";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import { Toaster } from "react-hot-toast";
import Header from "./shared/components/Header/Header";
import { AuthUser } from "./shared/models/AuthUser.model";
import Footer from "./shared/components/Footer/Footer";
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

function App() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<AuthUser | null>(null);
  const [userRole, setUserRole] = useState<Roles | null>(null);
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  const changeUserDataContext = useCallback((user: AuthUser | null) => {
    setUserData(user);
  }, []);

  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        getCurrentUser().then(({ data: user }) => {
          // Converti User in AuthUser
          const authUser: AuthUser = {
            idUser: user.idUser,
            email: user.email,
            role: user.role,
          };
          setUserData(authUser);
          setUserRole(decodedToken.user.role);
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{
            user: userData,
            setUser: changeUserDataContext,
            role: userRole,
            setRole: setUserRole,
          }}
        >
          {!hideHeader && <Header />}
          <Toaster />
          <Outlet />
          <Footer />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
