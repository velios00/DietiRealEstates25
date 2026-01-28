import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Offer } from "../../../models/Offer.model";

interface OfferHistoryModalProps {
  open: boolean;
  onClose: () => void;
  offers: Offer[];
  startingPrice: number;
  currentUserRole?: string;
  currentUserFullName?: string | null;
}

export default class OfferHistoryModal extends Component<OfferHistoryModalProps> {
  getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircleIcon color="success" />;
      case "rejected":
        return <CancelIcon color="error" />;
      case "pending":
        return <AccessTimeIcon color="warning" />;
      default:
        return null;
    }
  };

  getStatusChip = (status: string) => {
    switch (status) {
      case "accepted":
        return <Chip label="Accettata" color="success" size="small" />;
      case "rejected":
        return <Chip label="Rifiutata" color="error" size="small" />;
      case "pending":
        return <Chip label="In Attesa" color="warning" size="small" />;
      default:
        return null;
    }
  };

  formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  render() {
    const { open, onClose, offers, startingPrice } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            alignItems: "center",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid #e0e0e0",
            pb: 2,
            position: "relative",
            backgroundColor: "#f8f9fa",
            width: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold" color="#2c3e50">
              Storico Offerte
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: "#7f8c8d",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              backgroundColor: "#f0f7fa",
              borderLeft: "4px solid #62A1BA",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <AttachMoneyIcon sx={{ color: "#62A1BA", fontSize: 32 }} />
              <Box>
                <Typography variant="subtitle2" color="#5d6d7e">
                  Prezzo di partenza
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                  {this.formatCurrency(startingPrice)}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Offerte ricevute
          </Typography>

          {offers.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography color="textSecondary">
                Nessuna offerta ricevuta
              </Typography>
            </Box>
          ) : (
            <List sx={{ width: "100%" }}>
              {offers.map((offer, index) => (
                <React.Fragment key={offer.idOffer}>
                  <ListItem
                    sx={{
                      px: 0,
                      py: 2,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#62A1BA" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="subtitle1" fontWeight={600}>
                            {offer.userName + " " + offer.userSurname}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#2c3e50"
                          >
                            {this.formatCurrency(offer.amount)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={1}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            {this.getStatusIcon(offer.status)}
                            {this.getStatusChip(offer.status)}
                          </Box>
                          <Typography variant="caption" color="textSecondary">
                            {offer.dateOffer}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < offers.length - 1 && <Divider variant="inset" />}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#62A1BA",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(98, 161, 186, 0.08)",
              },
            }}
          >
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
