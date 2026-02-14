import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../../assets/Dieticolorato.png";
import { LoginForm } from "../../shared/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        background: "linear-gradient(-180deg, #62A1BA 0%, #FFFFFF 50%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box component="img" src={logo} alt="Logo" sx={{ width: 250 }} />
        </Link>

        <Box sx={{ flex: 1, maxWidth: 450 }}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
