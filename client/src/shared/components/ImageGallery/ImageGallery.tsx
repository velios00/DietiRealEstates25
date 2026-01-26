import { useState } from "react";
import {
  Box,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Close, Image } from "@mui/icons-material";

interface ImageGalleryProps {
  photos: string[];
  title: string;
}

export default function ImageGallery({ photos, title }: ImageGalleryProps) {
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <>
      {/* Gallery Layout */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Grande immagine sinistra */}
        <Box
          onClick={() => {
            setCurrentImageIndex(0);
            setOpenGallery(true);
          }}
          sx={{
            position: "relative",
            flex: 1,
            aspectRatio: "3 / 2",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            border: "1px solid #62A1BA",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardMedia
            component="img"
            image={photos[0]}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Piccole immagini destra - stesso height della grande */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 0.5 }}
        >
          {/* Seconda immagine */}
          {photos.length > 1 && (
            <Box
              onClick={() => {
                setCurrentImageIndex(1);
                setOpenGallery(true);
              }}
              sx={{
                flex: 1,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #62A1BA",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.3s",
                "&:hover": {
                  opacity: 0.9,
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={photos[1]}
                alt="Photo 2"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Vedi tutte le foto */}
          {photos.length > 2 && (
            <Box
              onClick={() => {
                setCurrentImageIndex(2);
                setOpenGallery(true);
              }}
              sx={{
                flex: 1,
                borderRadius: 2,
                overflow: "hidden",
                bgImage: `url(${photos[2]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                border: "3px solid #62A1BA",
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0,0,0,0.5)",
                  transition: "background-color 0.3s",
                },
                "&:hover:before": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                "&:hover": {
                  transform: "scale(1.02)",
                },
                p: 1,
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Image sx={{ display: "block", mb: 0.5, fontSize: "2rem" }} />
                Vedi le altre {photos.length - 2} foto
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Dialog Galleria completa */}
      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
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
          Tutte le foto
          <IconButton
            onClick={() => setOpenGallery(false)}
            size="small"
            sx={{ cursor: "pointer" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={16} sx={{ mt: 2, mb: 2 }}>
            {photos.map((photo, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={photo}
                  alt={`${title} ${idx + 1}`}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </>
  );
}
