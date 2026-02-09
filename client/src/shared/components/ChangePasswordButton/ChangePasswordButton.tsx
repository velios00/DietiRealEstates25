import { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

export default function ChangePasswordButton() {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChangePassword = () => {
    setPasswordModalOpen(true);
  };

  const handlePasswordChangeSuccess = () => {
    setSnackbar({
      open: true,
      message:
        "Password modificata con successo! Per sicurezza, effettua nuovamente l'accesso.",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<LockIcon />}
        onClick={handleChangePassword}
        sx={{
          backgroundColor: "#62A1BA",
          fontSize: "1rem",
          fontWeight: 600,
          px: 3,
          py: 1.5,
          borderRadius: 3,
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "#4a8ba3",
          },
        }}
      >
        Cambia Password
      </Button>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordChangeSuccess}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
