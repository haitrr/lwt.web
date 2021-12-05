import React from "react";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InsightsIcon from '@mui/icons-material/Insights';
import { useHistory } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import UserMenu from "./UserMenu";
import { RootState } from "../../RootReducer";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const history = useHistory();
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            disabled={!isLoggedIn}
            onClick={() => history.push("/")}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={!isLoggedIn}
            onClick={() => history.push("/text")}
          >
            <MenuBookIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={!isLoggedIn}
            onClick={() => history.push("/statistics")}
          >
            <InsightsIcon fontSize="large" />
          </IconButton>
        </div>
        <div>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "1rem" }}
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
