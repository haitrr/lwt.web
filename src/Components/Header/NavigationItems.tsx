import {useSelector} from "react-redux";
import {RootState} from "../../RootReducer";
import {useHistory} from "react-router";
import {IconButton} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InsightsIcon from "@mui/icons-material/Insights";
import React from "react";

const NavigationItems = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const history = useHistory();
  return <>
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
  </>
}

export default NavigationItems;
