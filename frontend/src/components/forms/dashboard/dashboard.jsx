import { Box, Button, Typography } from "@mui/material";

function DashboardHeader({ title, subtitle, onLogout }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      <Button variant="outlined" color="error" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default DashboardHeader;