import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import NavigationItems from "./NavigationItems";
import RightMenus from "./RightMenus";


const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NavigationItems/>
        </div>
        <div>
          <RightMenus/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
