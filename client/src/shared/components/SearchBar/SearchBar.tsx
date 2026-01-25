import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [localValue, setLocalValue] = useState("");

  const currentValue = useMemo(() => value ?? localValue, [value, localValue]);

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
        onChange={(event) => {
          onChange?.(event.target.value);
          if (!onChange) {
            setLocalValue(event.target.value);
          }
        }}
        InputProps={{ disableUnderline: true }}
      />
      <IconButton type="submit" sx={{ mr: 1.5, color: "#666" }}>
        <SearchOutlinedIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
}
