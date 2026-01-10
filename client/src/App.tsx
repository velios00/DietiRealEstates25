import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { User } from "./shared/models/User.model";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./shared/models/JwtPayload.model";
import { getUserById } from "./services/UserService";
import { UserContext } from "./shared/context/UserContext";
import { Roles } from "./shared/enums/Roles.enum";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Roles | null>(null);

  const changeUserDataContext = useCallback((user: User | null) => {
    setUserData(user);
  }, []);

  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log("token scaduto, mettere logout");
      } else {
        getUserById(decodedToken.user.idUser).then(({ data: user }) => {
          setUserData(user);
          setUserRole(decodedToken.user.role);
        });
      }
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const decodedToken = jwtDecode<JwtPayload>(token);
  //     const currentTime = Date.now() / 1000; // Convert to seconds
  //     if (decodedToken.exp && decodedToken.exp < currentTime) {
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     } else {
  //       getUserData(decodedToken.user.id).then(({ data: user }) => {
  //         setUserData(user);
  //       });
  //     }
  //   }
  // }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user: userData,
          setUser: changeUserDataContext,
          role: userRole,
          setRole: setUserRole,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
