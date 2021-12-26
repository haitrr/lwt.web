import { toast } from 'react-toastify';
import useLastReadText from '../../../Hooks/useLastReadText';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
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
      <h3>{data.title}</h3>
      <h4>{`${data.language}`}</h4>
      <h4>{`Done: ${data.bookmark}/${data.termCount}(${progressPercentage}%)`}</h4>
      <Link style={{ textDecoration: 'none' }} to={`text/read/${data.id}`}>
        <Button color="primary" variant="outlined">
          Continue reading
        </Button>
      </Link>
    </div>
  );
};

export default LastRead;
