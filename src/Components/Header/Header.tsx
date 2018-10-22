import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Header
 */
export class Header extends React.Component {
  public render(): React.ReactNode {
    return (
      <div className="header">
        <Link to="/">LWT</Link>
        <Link to="/login" className="right">
          Login
        </Link>
        <Link to="/register" className="right">
          Register
        </Link>
      </div>
    );
  }
}
