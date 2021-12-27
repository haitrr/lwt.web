import { useMediaQuery } from '@mui/material';
import { VictoryTheme } from 'victory';
import { SvgProperties } from 'csstype';

const useVictoryTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (prefersDarkMode) {
    const darkTheme = VictoryTheme.grayscale;
    const white = '#fff';
    darkTheme.pie = {
      ...darkTheme.pie,
      style: {
        ...darkTheme.pie?.style,
        labels: {
          ...darkTheme.pie?.style?.labels,
          fill: white,
        } as SvgProperties,
      },
    };
    return VictoryTheme.grayscale;
  }
  return VictoryTheme.material;
};

export default useVictoryTheme;
