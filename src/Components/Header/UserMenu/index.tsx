import React, { useContext } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router';
import { UserContext } from '../../../App';

const UserMenu: React.FC = () => {
  const [user, logout] = useContext(UserContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (!user) {
    throw new Error('User is not logged in');
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {user.userName}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
