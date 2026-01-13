import { validateEmail, validatePassword } from "../../utils/validation";
import { RegisterData } from "../../models/RegisterData.model";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { registerUser } from "../../../services/AuthService";
import { RegisterRequest } from "../../models/AuthRequest.model";
export function RegisterForm() {
  const navigate = useNavigate();
  //const [showPassword, setShowPassword] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: { value: "", validateCriteria: validateEmail },
    password: { value: "", validateCriteria: validatePassword },
    name: { value: "" },
    surname: { value: "" },
    userAddress: { value: "" },
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emailError = registerData.email.validateCriteria?.(
        registerData.email.value
      );
      const passwordError = registerData.password.validateCriteria?.(
        registerData.password.value
      );

      if (emailError || passwordError) {
        if (emailError) toast.error(emailError);
        if (passwordError) toast.error(passwordError);
        return;
      }

      const registerRequest: RegisterRequest = {
        email: registerData.email.value,
        password: registerData.password.value,
        name: registerData.name.value,
        surname: registerData.surname.value,
        userAddress: registerData.userAddress.value,
        role: "user",
      };
      registerUser(registerRequest)
        .then(() => {
          toast.success("Registrazione effettuata con successo");
          navigate("/");
        })
        .catch((error) => {
          toast.error(
            "Errore nella registrazione, prova ad usare credenziali diverse"
          );
          console.error("Errore nella registrazione: ", error);
        });
    },
    [navigate, registerData]
  );

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <Paper elevation={3} className="w-full max-w-md p-8 rounded-2x1">
            <Typography variant="h4" align="center" className="mb-6">
              Registrati
            </Typography>
            <Grid component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={registerData.email.value}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: {
                          ...registerData.email,
                          value: e.target.value,
                        },
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
                    value={registerData.password.value}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: {
                          ...registerData.password,
                          value: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Nome"
                    name="name"
                    fullWidth
                    value={registerData.name.value}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        name: {
                          ...registerData.name,
                          value: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Cognome"
                    name="surname"
                    fullWidth
                    value={registerData.surname.value}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        surname: {
                          ...registerData.surname,
                          value: e.target.value,
                        },
                      })
                    }
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Indirizzo"
                    name="userAddress"
                    fullWidth
                    value={registerData.userAddress.value}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        userAddress: {
                          ...registerData.userAddress,
                          value: e.target.value,
                        },
                      })
                    }
                  ></TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button type="submit" variant="contained" fullWidth>
                    Registrati
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
