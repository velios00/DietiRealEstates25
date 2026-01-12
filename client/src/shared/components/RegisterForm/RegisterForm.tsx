import { validateEmail, validatePassword } from "../../utils/validation";
import { RegisterData } from "../../models/RegisterData.model";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent } from "react";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
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
          <Paper elevation={3} className="p-6">
            <Typography variant="h4" align="center" className="mb-6">
              Registrati
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                  ></TextField>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
