import { Box } from "@mui/material";

export interface EstatesPageLayoutProps {
  topSection: React.ReactNode;
  listSection: React.ReactNode;
  mapSection: React.ReactNode;
}

export default function EstatesPageLayout({
  topSection,
  listSection,
  mapSection,
}: EstatesPageLayoutProps) {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar (search / agency info / ecc) */}
      {topSection && (
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>{topSection}</Box>
      )}

      {/*Content*/}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/*Listings section*/}
        <Box
          sx={{
            width: 420,
            p: 2,
            overflowY: "auto",
            borderRight: "1px solid #eee",
          }}
        >
          {listSection}
        </Box>
        {/*Map section*/}
        <Box sx={{ flex: 1 }}>{mapSection}</Box>
      </Box>
    </Box>
  );
}
