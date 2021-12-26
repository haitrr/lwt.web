import { useMediaQuery } from '@mui/material';
import { VictoryTheme } from 'victory';

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
          // @ts-expect-error: wrong type definition from lib
          fill: white,
        },
      },
    };
    return VictoryTheme.grayscale;
  }
  return VictoryTheme.material;
};

export default useVictoryTheme;
