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
import ImageViewerDialog from "./ImageViewerDialog";

interface ImageGalleryProps {
  photos: string[];
  title: string;
}

export default function ImageGallery({ photos, title }: ImageGalleryProps) {
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openViewer, setOpenViewer] = useState(false);

  if (!photos || photos.length === 0) {
    return null;
  }

  const handleOpenViewer = (index: number) => {
    setCurrentImageIndex(index);
    setOpenViewer(true);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <>
      {/* Gallery Layout */}
      <Box
        sx={{ display: "flex", gap: 2, height: "500px", overflow: "hidden" }}
      >
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
            height: "100%",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            flex: 0.5,
            height: "100%",
          }}
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
                backgroundImage: `url(${photos[2]})`,
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
                border: "1px solid #62A1BA",
                position: "relative",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(98, 161, 186, 0.6)",
                  transition: "background-color 0.3s",
                },
                "&:hover:before": {
                  bgcolor: "rgba(98, 161, 186, 0.8)",
                },
                "&:hover": {
                  transform: "scale(1.02)",
                },
                p: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                  onClick={() => handleOpenViewer(idx)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>

      <ImageViewerDialog
        open={openViewer}
        title={title}
        photos={photos}
        currentIndex={currentImageIndex}
        onClose={() => setOpenViewer(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
