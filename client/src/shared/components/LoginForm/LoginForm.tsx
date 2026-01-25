import { validateEmail } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent, useContext } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
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
      console.log("Submitting login form with data:", loginData);

      if (emailError) {
        if (emailError) toast.error(emailError);
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
            email: decodedToken.user.email,
            role: decodedToken.user.role,
          };
          // userContext?.setUser(authUser);
          if (userContext?.setUser) {
            userContext.setUser(authUser);
            console.log("UserContext dopo setUser:", userContext?.user);
          }
          window.dispatchEvent(new Event("storage"));

          toast.success("Login effettuato con successo");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Errore nel login, controlla le tue credenziali");
          console.error("Errore nel login: ", error);
        });
    },
    [navigate, loginData, userContext],
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 5,
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          mb: 4,
        }}
      >
        Accedi
      </Typography>

      <Grid component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 6,
                  padding: "8px 14px",
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 6,
                  padding: "8px 14px",
                },
              }}
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 4,
                py: 1.5,
                backgroundColor: "#62A1BA",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#4a8ba3",
                },
              }}
            >
              Accedi
            </Button>

            <Typography
              align="center"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
                mt: 3,
                cursor: "pointer",
                color: "#62A1BA",
                textDecoration: "underline",
                "&:hover": {
                  color: "#4a8ba3",
                },
              }}
              onClick={() => navigate("/register")}
            >
              Non hai un account? Registrati
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
