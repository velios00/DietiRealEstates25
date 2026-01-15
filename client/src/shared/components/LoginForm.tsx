import { validateEmail, validatePassword } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { loginUser } from "../../services/AuthService";
import { LoginRequest } from "../models/AuthRequest.model";

export function LoginForm() {
  const navigate = useNavigate();
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
        .then(() => {
          toast.success("Login effettuato con successo");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Errore nel login, controlla le tue credenziali");
          console.error("Errore nel login: ", error);
        });
    },
    [navigate, loginData]
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
