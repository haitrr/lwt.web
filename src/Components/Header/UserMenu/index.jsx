import PropTypes from "prop-types";
import React from "react";
import { Dropdown, Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./UserMenu.module.scss";
import { logoutAction } from "../../../Actions/UserAction";

const UserMenu = ({ userName, logout }) => {
  const menu = (
    <Menu className={styles.menu}>
      <Menu.Item>
        <div>{`Hi ${userName}`}</div>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <button type="button" className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Link to="/profile">
        <Icon type="user" />
      </Link>
    </Dropdown>
  );
};

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default connect(
  state => ({
    userName: state.user.userName
  }),
  {
    logout: logoutAction
  }
)(UserMenu);
