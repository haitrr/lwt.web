import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { USER_LOGGED_OUT } from "../../../Actions/UserAction";
import { RootState } from "../../../RootReducer";
import { logout } from "../../../Apis/UserApi";

const UserMenu: React.FC = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const dispatch = useDispatch();
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
    dispatch({ type: USER_LOGGED_OUT });
    history.push("/login");
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {userName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
