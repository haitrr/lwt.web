import { useMediaQuery } from "@material-ui/core";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const Themer: React.FC = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { children } = props;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Themer;
