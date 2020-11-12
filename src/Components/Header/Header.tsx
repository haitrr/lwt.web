import React from "react";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useHistory } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import styles from "./Header.module.scss";
import UserMenu from "./UserMenu";
import { RootState } from "../../RootReducer";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const history = useHistory();
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton onClick={() => history.push("/")}>
            <HomeIcon fontSize="large" color="secondary" />
          </IconButton>
          <IconButton onClick={() => history.push("/text")}>
            <MenuBookIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>
        <div>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link className={styles.navigationLink} to="/login">
                <Button>Login</Button>
              </Link>
              <Link className={styles.navigationLink} to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
