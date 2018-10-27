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
        <span className="left-menu menu">
          <Link to="/">LWT</Link>
          <Link to="/text">Text</Link>
        </span>
        <span className="right-menu menu">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </span>
      </div>
    );
  }
}
