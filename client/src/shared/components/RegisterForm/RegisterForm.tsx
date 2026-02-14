import { validateEmail, validatePassword } from "../../utils/validation";
import { RegisterData } from "../../models/RegisterData.model";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, FormEvent } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { registerUser } from "../../../services/AuthService";
import { RegisterRequest } from "../../models/AuthRequest.model";
import { Roles } from "../../enums/Roles.enum";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        registerData.email.value,
      );
      const passwordError = registerData.password.validateCriteria?.(
        registerData.password.value,
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
        role: Roles.USER,
      };
      registerUser(registerRequest)
        .then(() => {
          toast.success("Registrazione effettuata con successo");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(
            "Errore nella registrazione, prova ad usare credenziali diverse",
          );
          console.error("Errore nella registrazione: ", error);
        });
    },
    [navigate, registerData],
  );

  const roundedFieldStyle = {
    "& .MuiInputLabel-root": {
      top: "50%",
      transform: "translate(14px, -50%) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      top: 0,
      transform: "translate(14px, -9px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 6,
      padding: "8px 14px",
    },
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <Paper
            elevation={3}
            className="w-full max-w-md p-8 rounded-2x1"
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 5,
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              className="mb-6"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                mb: 4,
              }}
            >
              Registrati
            </Typography>
            <Grid component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    sx={roundedFieldStyle}
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
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    sx={roundedFieldStyle}
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
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Nome"
                    name="name"
                    fullWidth
                    sx={roundedFieldStyle}
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
                    sx={roundedFieldStyle}
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
                    sx={roundedFieldStyle}
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 4,
                      padding: "10px 0",
                      backgroundColor: "#62A1BA",
                      "&:hover": {
                        backgroundColor: "#4a8ba3",
                      },
                    }}
                  >
                    Registrati
                  </Button>

                  <Typography
                    align="center"
                    sx={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 500,
                      mt: 2,
                      cursor: "pointer",
                      color: "#62A1BA",
                      "&:hover": {
                        color: "#4a8ba3",
                      },
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Hai già un account? Accedi
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
