import { useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";

interface ImageViewerDialogProps {
  open: boolean;
  title: string;
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageViewerDialog({
  open,
  title,
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageViewerDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrev();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onNext, onPrev]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: "rgba(0,0,0,0.9)",
          color: "white",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onPrev}
          sx={{
            position: "absolute",
            left: 16,
            color: "white",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
          aria-label="Immagine precedente"
        >
          <ArrowBackIosNew />
        </IconButton>

        <Box
          component="img"
          src={photos[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          sx={{
            maxHeight: "85vh",
            maxWidth: "90vw",
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: "0 6px 30px rgba(0,0,0,0.4)",
          }}
        />

        <IconButton
          onClick={onNext}
          sx={{
            position: "absolute",
            right: 16,
            color: "white",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
          aria-label="Immagine successiva"
        >
          <ArrowForwardIos />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
