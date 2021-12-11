import {useSelector} from "react-redux";
import {RootState} from "../../RootReducer";
import {useHistory} from "react-router";
import {IconButton} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InsightsIcon from "@mui/icons-material/Insights";
import React from "react";

const NavigationItems = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const history = useHistory();
  return <>
    <IconButton disabled={!isLoggedIn} onClick={() => history.push("/")} size="large">
      <HomeIcon fontSize="large" />
    </IconButton>
    <IconButton disabled={!isLoggedIn} onClick={() => history.push("/text")} size="large">
      <MenuBookIcon fontSize="large" />
    </IconButton>
    <IconButton
      disabled={!isLoggedIn}
      onClick={() => history.push("/statistics")}
      size="large">
      <InsightsIcon fontSize="large" />
    </IconButton>
  </>;
}

export default NavigationItems;
