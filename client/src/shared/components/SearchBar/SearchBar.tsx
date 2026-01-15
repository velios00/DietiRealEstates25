import { TextField, IconButton, Paper } from "@mui/material";

export function SearchBar() {
  return (
    <Paper className="flex items-center p-2 rounded-full">
      <TextField
        placeholder="Cerca comuni, cazzi vari"
        variant="standard"
        fullWidth
        InputProps={{ disableUnderline: true }}
      />
      <IconButton color="primary"></IconButton>
    </Paper>
  );
}
