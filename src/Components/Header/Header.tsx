import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import UserMenu from "./UserMenu";
import { RootState } from "../../RootReducer";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link className={styles.navigationLink} to="/">
            <Button>Home</Button>
          </Link>
          <Link className={styles.navigationLink} to="/text">
            <Button>Text</Button>
          </Link>
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
