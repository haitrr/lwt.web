import {useMediaQuery} from "@material-ui/core";
import {VictoryTheme} from "victory";

const useVictoryTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  if(prefersDarkMode) {
    return VictoryTheme.grayscale;
  }
  return VictoryTheme.material;
}

export default useVictoryTheme;
