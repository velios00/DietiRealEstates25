import { ReactNode, use, useEffect, useState } from "react";
import { Roles } from "../../enums/Roles.enum";
import { useUser } from "../../hooks/useUser";
import { AuthUser } from "../../models/AuthUser.model";
import { decodeToken, isTokenExpired } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: Roles[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const navigate = useNavigate();
  const userContext = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Se non c'è un utente nel context, prova a recuperarlo dal token
      if (!userContext?.user) {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decodedToken = decodeToken(token);

            // Verifica se il token è scaduto
            if (isTokenExpired(decodedToken.exp)) {
              localStorage.removeItem("token");
              navigate("/login", { replace: true });
              return;
            }

            const authUser: AuthUser = {
              idUser: decodedToken.user.idUser,
              email: decodedToken.user.email,
              role: decodedToken.user.role,
            };

            userContext?.setUser(authUser);

            // Controlla i ruoli dopo aver settato l'utente
            if (allowedRoles && !allowedRoles.includes(authUser.role)) {
              navigate("/", { replace: true });
              return;
            }

            setIsAuthorized(true);
          } catch (error) {
            console.error("Errore nel decodificare il token:", error);
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
            return;
          }
        } else {
          navigate("/login", { replace: true });
          return;
        }
      } else {
        // Controlla se l'utente ha il ruolo richiesto
        if (allowedRoles && !allowedRoles.includes(userContext.user.role)) {
          navigate("/", { replace: true });
          return;
        }

        setIsAuthorized(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [userContext, allowedRoles, navigate]);

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
