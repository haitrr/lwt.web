import PropTypes from "prop-types";
import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../Actions/UserAction";
import styles from "./Header.module.scss";
import UserMenu from "./UserMenu";

/**
 * Header
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link className={styles.navigationLink} to="/">
              <Button>Home</Button>
            </Link>
            <Link className={styles.navigationLink} to="/text">
              <Button>Text</Button>
            </Link>
          </div>
          <div>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Link className={styles.navigationLink} to="/login">
                  <Button>Login</Button>
                </Link>
                <Link className={styles.navigationLink} to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default connect(
  (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userName: state.user.userName,
  }),
  {
    logout: logoutAction,
  }
)(Header);
