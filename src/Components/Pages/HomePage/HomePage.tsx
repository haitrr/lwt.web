import React from "react";
import {Redirect} from "react-router";
import useUser from "../../../Hooks/useUser";
import LastRead from "./LastRead";

interface Props {
}

/**
 * Home page
 */
const HomePage: React.FC<Props> = () => {
  const [user] = useUser();
  return user ? (
    <div style={{padding: "2rem"}}>
      <LastRead/>
    </div>
  ) : (
    <Redirect to="/login"/>
  );
}

const connectedHomePage = HomePage;
export {connectedHomePage as HomePage};
