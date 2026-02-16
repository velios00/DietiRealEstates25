import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@mui/icons-material";
import { changePassword } from "../../../services/UserService";
import toast from "react-hot-toast"; // <-- importato toast

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function ChangePasswordModal({
  open,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // stati error/success rimossi

  // Validazione password
  const validatePassword = (password: string): PasswordValidation => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const validation = validatePassword(newPassword);
  const isPasswordValid = Object.values(validation).every((v) => v);
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword !== "";

  const handleSubmit = async () => {
    // Validazioni frontend
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Tutti i campi sono obbligatori");
      return;
    }

    if (!isPasswordValid) {
      toast.error("La nuova password non soddisfa i requisiti di sicurezza");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Le password non corrispondono");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("La nuova password deve essere diversa da quella attuale");
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        oldPassword,
        newPassword,
      });

      toast.success("Password modificata con successo!");
      // Chiudi il modale dopo 1.5 secondi
      setTimeout(() => {
        handleClose();
        onSuccess();
      }, 1500);
    } catch (err: any) {
      console.error("Errore cambio password:", err);
      toast.error(
        err.response?.data?.message ||
          "Errore durante il cambio password. Verifica che la password attuale sia corretta.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          elevation: 8,
          sx: {
            borderRadius: 4,
            padding: 2,
            backgroundColor: "grey.100",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Cambia Password
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Alert rimossi, ora usiamo toast */}

          {/* Password Attuale */}
          <TextField
            fullWidth
            label="Password Attuale"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="normal"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Nuova Password */}
          <TextField
            fullWidth
            label="Nuova Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            disabled={loading}
            error={newPassword !== "" && !isPasswordValid}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Requisiti Password */}
          {newPassword && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1, display: "block" }}
              >
                Requisiti password:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  variant="caption"
                  color={
                    validation.minLength ? "success.main" : "text.secondary"
                  }
                >
                  {validation.minLength ? "✓" : "○"} Almeno 8 caratteri
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    validation.hasUpperCase ? "success.main" : "text.secondary"
                  }
                >
                  {validation.hasUpperCase ? "✓" : "○"} Una lettera maiuscola
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    validation.hasLowerCase ? "success.main" : "text.secondary"
                  }
                >
                  {validation.hasLowerCase ? "✓" : "○"} Una lettera minuscola
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    validation.hasNumber ? "success.main" : "text.secondary"
                  }
                >
                  {validation.hasNumber ? "✓" : "○"} Un numero
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    validation.hasSpecialChar
                      ? "success.main"
                      : "text.secondary"
                  }
                >
                  {validation.hasSpecialChar ? "✓" : "○"} Un carattere speciale
                  (!@#$%^&*...)
                </Typography>
              </Box>
            </Box>
          )}

          {/* Conferma Password */}
          <TextField
            fullWidth
            label="Conferma Nuova Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            disabled={loading}
            error={confirmPassword !== "" && !passwordsMatch}
            helperText={
              confirmPassword !== "" && !passwordsMatch
                ? "Le password non corrispondono"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: "#666" }}>
          Annulla
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading ||
            !oldPassword ||
            !newPassword ||
            !confirmPassword ||
            !isPasswordValid ||
            !passwordsMatch
          }
          sx={{
            backgroundColor: "#62A1BA",
            "&:hover": {
              backgroundColor: "#4a8ba3",
            },
          }}
        >
          {loading ? "Salvataggio..." : "Cambia Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
