import {CssBaseline, useMediaQuery} from "@mui/material";
import React from "react";
import {createTheme, ThemeProvider, StyledEngineProvider, PaletteOptions} from "@mui/material/styles";


const Themer: React.FC = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const {children} = props;

  const palette: PaletteOptions = React.useMemo(() => ({
    mode: prefersDarkMode ? "dark" : "light",
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
      createTheme({
        components: {
          MuiTextField: {
            defaultProps: {
              margin: 'dense',
            }
          },
          MuiFormControl: {
            defaultProps: {
              margin: 'dense',
            }
          },
          MuiSelect: {
            defaultProps: {
              margin: 'dense',
            }
          },
          MuiTableCell: {
            defaultProps: {
              align: 'center',
            }
          },
        },
        palette,
      }),
    [palette]
  );
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Themer;
