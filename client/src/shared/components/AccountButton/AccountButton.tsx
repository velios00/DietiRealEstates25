import {
  Button,
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getUserAgencyId } from "../../../services/UserService";
import toast from "react-hot-toast";

export default function AccountButton() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const userRole = userContext?.user?.role;
  const userId = userContext?.user?.idUser;
  const isLoggedIn = Boolean(userContext?.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoadingAgency, setIsLoadingAgency] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    userContext?.setUser(null);
    handleClose();
    toast.success("Logout effettuato con successo");
    navigate("/");
  };

  const handleAgencyClick = async () => {
    if (!userId) {
      toast.error("Errore: utente non identificato");
      handleClose();
      return;
    }
    setIsLoadingAgency(true);

    try {
      const response = await getUserAgencyId(parseInt(userId));
      const agencyId = response.data.idAgency;

      handleClose();
      navigate(`/agency/${agencyId}`);
    } catch (error) {
      console.error("Errore nel recupero dell'agenzia:", error);
      toast.error("Impossibile accedere all'agenzia");
      handleClose();
    } finally {
      setIsLoadingAgency(false);
    }
  };

  const handleAdminDashboardClick = () => {
    handleClose();
    navigate("/admin");
  };

  const handleUserDashboardClick = () => {
    handleClose();
    navigate("/user");
  };

  const renderRoleBasedMenuItem = () => {
    if (userRole === "agent" || userRole === "manager") {
      return (
        <MenuItem
          onClick={handleAgencyClick}
          disabled={isLoadingAgency}
          sx={{
            color: "#62A1BA",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.08)",
            },
            "&.Mui-disabled": {
              opacity: 0.6,
            },
          }}
        >
          <ListItemIcon>
            <BusinessIcon sx={{ color: "#62A1BA" }} />
          </ListItemIcon>
          <ListItemText>
            {isLoadingAgency ? "Caricamento..." : "La mia agenzia"}
          </ListItemText>
        </MenuItem>
      );
    }

    if (userRole === "admin") {
      return (
        <MenuItem
          onClick={handleAdminDashboardClick}
          sx={{
            color: "#62A1BA",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#62A1BA" }} />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
      );
    }

    if (userRole === "user") {
      return (
        <MenuItem
          onClick={handleUserDashboardClick}
          sx={{
            color: "#62A1BA",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              backgroundColor: "rgba(98, 161, 186, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#62A1BA" }} />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={isLoggedIn ? <KeyboardArrowDownIcon /> : undefined}
        startIcon={
          <Avatar
            sx={{
              backgroundColor: "#62A1BA",
              width: 40,
              height: 40,
              marginRight: 0.5,
              "&:hover": {
                backgroundColor: "#62A1BA",
              },
            }}
          >
            <PersonOutlineIcon sx={{ color: "white", fontSize: 40, px: 0.2 }} />
          </Avatar>
        }
        sx={{
          color: "#62A1BA",
          borderColor: "#62A1BA",
          borderRadius: 28,
          px: 3,
          py: 1,
          fontWeight: 800,
          fontSize: "1.3rem",
          textTransform: "lowercase",
          "&:hover": {
            borderColor: "#62A1BA",
            backgroundColor: "rgba(98, 161, 186, 0.04)",
          },
        }}
      >
        {isLoggedIn ? "Account" : "login"}
      </Button>

      {isLoggedIn && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            mt: 1,
            "& .MuiPaper-root": {
              borderRadius: 3,
              minWidth: 180,
            },
          }}
        >
          {renderRoleBasedMenuItem()}

          {/* Divider solo se c'è una voce di menu precedente */}
          {renderRoleBasedMenuItem() && <Divider sx={{ my: 0.5 }} />}

          <MenuItem
            onClick={handleLogout}
            sx={{
              color: "#62A1BA",
              fontWeight: 600,
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(98, 161, 186, 0.08)",
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#62A1BA" }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
          {/* TODO: Aggiungere altre opzioni basate sul ruolo */}
        </Menu>
      )}
    </Box>
  );
}
