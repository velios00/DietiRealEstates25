import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  IconButton,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { Location } from "../../models/Location.model";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onLocationSelect?: (location: Location) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  onLocationSelect,
  placeholder,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [localValue, setLocalValue] = useState("");
  const { suggestions, loading, search, clear } = useLocationSearch();

  const currentValue = useMemo(() => value ?? localValue, [value, localValue]);

  const handleInputChange = (newValue: string) => {
    onChange?.(newValue);
    if (!onChange) {
      setLocalValue(newValue);
    }
    search(newValue);
  };

  const handleLocationSelect = (location: Location) => {
    setLocalValue(location.address);
    clear();
    onLocationSelect?.(location);

    // Se siamo sulla homepage (onSearch non è definito), naviga automaticamente alla pagina di ricerca
    if (!onSearch) {
      navigate("/search-estates", {
        state: {
          query: location.city,
          location: location,
        },
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = currentValue.trim();

    if (onSearch) {
      onSearch(trimmed);
      return;
    }

    navigate("/search-estates", { state: { query: trimmed } });
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 65,
          backgroundColor: "white",
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid #62A1BA",
        }}
      >
        <TextField
          placeholder={placeholder ?? "Cerca un comune..."}
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
          value={currentValue}
          onChange={(event) => handleInputChange(event.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        {loading && <CircularProgress size={24} sx={{ mr: 2 }} />}
        <IconButton type="submit" sx={{ mr: 1.5, color: "#666" }}>
          <SearchOutlinedIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      {/* Dropdown autocomplete */}
      {suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 0.5,
            zIndex: 9999,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <List sx={{ py: 0 }}>
            {suggestions.map((location, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => handleLocationSelect(location)}
                sx={{
                  py: 1.5,
                  px: 2,
                  "&:hover": { bgcolor: "#f0f0f0" },
                  borderBottom:
                    idx < suggestions.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
              >
                <ListItemText
                  primary={location.city}
                  secondary={location.address}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { fontWeight: 500 },
                  }}
                  secondaryTypographyProps={{
                    variant: "caption",
                    sx: { color: "#999" },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
