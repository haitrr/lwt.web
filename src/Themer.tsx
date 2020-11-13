import { CssBaseline, useMediaQuery } from "@material-ui/core";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const Themer: React.FC = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { children } = props;

  const palette: PaletteOptions = {
    type: prefersDarkMode ? "dark" : "light",
  };

  if (prefersDarkMode) {
    palette.text = {
      primary: "#dedede",
      secondary: "#999999",
    };
  }

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette,
      }),
    [palette]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Themer;
