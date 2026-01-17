import { TextField, IconButton, Paper, Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 65,
        backgroundColor: "white",
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      <TextField
        placeholder="Cerca un indirizzo, un comune..."
        variant="standard"
        fullWidth
        sx={{
          flex: 1,
          height: "100%",
          "& .MuiInput-root": {
            height: "100%",
            padding: "0 24px",
            fontSize: "1.1rem", // Font più grande
            "&:before, &:after": {
              display: "none",
            },
          },
          "& .MuiInput-input": {
            padding: "0",
            "&::placeholder": {
              color: "#666",
              opacity: 0.8,
            },
          },
        }}
        InputProps={{ disableUnderline: true }}
      />
      <SearchOutlinedIcon sx={{ fontSize: 30, mr: 2, color: "#666" }} />
    </Box>
  );
}
