import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Header
 */
class Header extends React.Component<any> {
  public render(): React.ReactNode {
    const { isLoggedIn, userName } = this.props;

    return (
      <div className="header">
        <span className="left-menu menu">
          <Link to="/">LWT</Link>
          <Link to="/text">Text</Link>
        </span>
        <span className="right-menu menu">
          {isLoggedIn ? (
            <Link to="/profile">{userName}</Link>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </React.Fragment>
          )}
        </span>
      </div>
    );
  }
}

const connectedHeader: any = connect(
  (state: any) => ({
    isLoggedIn: state.user.isLoggedIn,
    userName: state.user.userName
  }),
  {}
)(Header);

export { connectedHeader as Header };
