import * as React from "react";
import { Link } from "react-router-dom";

/**
 * Home page
 */
const homePage: React.SFC = (): React.ReactElement<{}> => (
  <div>
    <h1>Home Page</h1>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
);

export { homePage as HomePage };
