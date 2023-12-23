import React from "react";
import Topbar from "./global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../Theme";

const Admin = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
