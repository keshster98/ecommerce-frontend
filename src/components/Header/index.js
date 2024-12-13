import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";

function Header() {
  return (
    <Box sx={{ textAlign: "center", pt: 5 }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: "bold" }}>
        Welcome To My Store
      </Typography>
      <Divider sx={{ pt: 5, borderBottomWidth: 3 }}></Divider>
    </Box>
  );
}

export default Header;
