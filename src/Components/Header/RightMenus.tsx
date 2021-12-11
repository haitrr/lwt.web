import {useSelector} from "react-redux";
import {RootState} from "../../RootReducer";
import {useHistory} from "react-router";
import UserMenu from "./UserMenu";
import {Button} from "@mui/material";
import React from "react";

const RightMenus = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const history = useHistory();
  return <>
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
  </>
}

export default RightMenus;
