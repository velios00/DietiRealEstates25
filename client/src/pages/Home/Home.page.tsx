import { Box } from "@mui/material";
import Header from "../../shared/components/Header/Header";
import { Hero } from "../../shared/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Box className="min-h-screen bg-gray-50">
        <Header />
      </Box>
    </>
  );
}
