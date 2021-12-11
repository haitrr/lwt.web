import {useMediaQuery} from "@mui/material";
import {VictoryTheme} from "victory";

const useVictoryTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  if(prefersDarkMode) {
    return VictoryTheme.grayscale;
  }
  return VictoryTheme.material;
}

export default useVictoryTheme;
