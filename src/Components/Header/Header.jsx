import PropTypes from "prop-types";
import React from "react";
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
      <div className={styles.header}>
        <span className={styles.leftMenu}>
          <Link className={styles.navigationLink} to="/">
            Home
          </Link>
          <Link className={styles.navigationLink} to="/text">
            Text
          </Link>
        </span>
        <span className={styles.rightMenu}>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <React.Fragment>
              <Link className={styles.navigationLink} to="/login">
                Login
              </Link>
              <Link className={styles.navigationLink} to="/register">
                Register
              </Link>
            </React.Fragment>
          )}
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

Header.defaultProps = {
  isLoggedIn: false
};

export default connect(
  state => ({
    isLoggedIn: state.user.isLoggedIn,
    userName: state.user.userName
  }),
  {
    logout: logoutAction
  }
)(Header);
