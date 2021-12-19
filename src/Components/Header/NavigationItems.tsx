import {useHistory} from "react-router";
import {IconButton} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InsightsIcon from "@mui/icons-material/Insights";
import { useContext } from "react";
import { UserContext } from "../../App";

const NavigationItems = () => {
  const [user] = useContext(UserContext);
  const history = useHistory();
  return <>
    <IconButton disabled={!user} onClick={() => history.push("/")} size="large">
      <HomeIcon fontSize="large" />
    </IconButton>
    <IconButton disabled={!user} onClick={() => history.push("/text")} size="large">
      <MenuBookIcon fontSize="large" />
    </IconButton>
    <IconButton
      disabled={!user}
      onClick={() => history.push("/statistics")}
      size="large">
      <InsightsIcon fontSize="large" />
    </IconButton>
  </>;
}

export default NavigationItems;
