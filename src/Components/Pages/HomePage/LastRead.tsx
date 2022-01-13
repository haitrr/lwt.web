import { toast } from 'react-toastify';
import useLastReadText from '../../../Hooks/useLastReadText';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import React from 'react';

const LastRead: React.VFC = () => {
  const { isLoading, error, data } = useLastReadText();
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    toast.error('failed to load last read text');
  }

  if (!data) {
    return null;
  }
  const progressPercentage = ((data.bookmark * 100) / data.termCount).toFixed(2);

  return (
    <div>
      <h2>Previously read</h2>
      <Card style={{ padding: '1rem', maxWidth: '20rem' }} variant="outlined">
        <Typography style={{ fontWeight: 'bold', marginBottom: '1rem' }} component="h3">
          {data.title}
        </Typography>
        <Typography style={{ marginBottom: '1rem' }} component="h4">{`${data.language}`}</Typography>
        <Typography
          style={{ marginBottom: '.5rem' }}
          component="h4"
        >{`Done: ${data.bookmark}/${data.termCount}(${progressPercentage}%)`}</Typography>
        <Link style={{ textDecoration: 'none' }} to={`text/read/${data.id}`}>
          <Button color="primary" variant="outlined">
            Continue reading
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default LastRead;
