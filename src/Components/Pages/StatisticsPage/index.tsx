import TextCountChart from './TextCountChart';
import TermCountChart from './TermCountChart';
import TermCountByLearningLevelChart from './TermCountByLearningLevelChart';
import { Grid } from '@mui/material';

const StatisticsPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={6} lg={4}>
        <div style={{ textAlign: 'center' }}>Texts</div>
        <div>
          <TextCountChart />
        </div>
      </Grid>
      <Grid item sm={6} lg={4}>
        <div style={{ textAlign: 'center' }}>Terms by languages</div>
        <div>
          <TermCountChart />
        </div>
      </Grid>
      <Grid item sm={6} lg={4}>
        <div style={{ textAlign: 'center' }}>Terms by learning levels</div>
        <div>
          <TermCountByLearningLevelChart />
        </div>
      </Grid>
    </Grid>
  );
};

export default StatisticsPage;
