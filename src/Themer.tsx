import { CssBaseline, useMediaQuery } from "@material-ui/core";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const Themer: React.FC = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { children } = props;

  const palette: PaletteOptions = React.useMemo(() =>({
    type: prefersDarkMode ? "dark" : "light",
    primary: {
      main: "#33ab9f",
    },
    secondary: {
      main: "#ff6333",
    },
    tonalOffset: 0.2,
  }), [prefersDarkMode]);

  if (prefersDarkMode) {
    palette.primary = {
      main: "#00695f",
    };
    palette.secondary = {
      main: "#b26500",
    };
    palette.text = {
      primary: "#dedede",
      secondary: "#999999",
    };
  }
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        props: {
          MuiTextField: {
            margin: "dense",
          },
          MuiFormControl: {
            margin: "dense",
          },
          MuiSelect: {
            margin: "dense",
          },
          MuiTableCell: {
            align: "center",
          },
        },
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
