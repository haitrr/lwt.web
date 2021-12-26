import { useHistory } from 'react-router';
import UserMenu from './UserMenu';
import { Button } from '@mui/material';
import { UserContext } from '../../App';
import { useContext } from 'react';

const RightMenus = () => {
  const [user] = useContext(UserContext);
  const history = useHistory();
  return (
    <>
      {user ? (
        <UserMenu />
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => history.push('/login')}>
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: '1rem' }}
            onClick={() => history.push('/register')}
          >
            Register
          </Button>
        </>
      )}
    </>
  );
};

export default RightMenus;
