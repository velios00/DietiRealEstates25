import { validateEmail, validatePassword } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent, useContext } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { loginUser } from "../../../services/AuthService";
import { LoginRequest } from "../../models/AuthRequest.model";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../models/JwtPayload.model";
import { UserContext } from "../../context/UserContext";
import { AuthUser } from "../../models/AuthUser.model";

export function LoginForm() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emailError = validateEmail(loginData.email);
      const passwordError = validatePassword(loginData.password);

      if (emailError || passwordError) {
        if (emailError) toast.error(emailError);
        if (passwordError) toast.error(passwordError);
        return;
      }

      const loginRequest: LoginRequest = {
        email: loginData.email,
        password: loginData.password,
      };

      loginUser(loginRequest)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode<JwtPayload>(token);
          const authUser: AuthUser = {
            idUser: decodedToken.user.idUser,
            email: decodedToken.user.username,
            role: decodedToken.user.role,
          };
          userContext?.setUser(authUser);
          window.dispatchEvent(new Event("storage"));

          toast.success("Login effettuato con successo");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Errore nel login, controlla le tue credenziali");
          console.error("Errore nel login: ", error);
        });
    },
    [navigate, loginData, userContext]
  );

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid>
        <Paper elevation={3} className="w-full max-w-md p-8 rounded-2x1">
          <Typography variant="h4" align="center" className="mb-6">
            Login
          </Typography>
          <Grid component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      password: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Accedi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
