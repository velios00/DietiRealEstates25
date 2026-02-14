import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../shared/components/RegisterForm/RegisterForm";
import { Box } from "@mui/material";
import logo from "../../assets/Dieticolorato.png";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        backgroundColor: "#d4d2d2",
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
          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
}
