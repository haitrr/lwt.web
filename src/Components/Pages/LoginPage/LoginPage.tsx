import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import { RootState } from "../../../RootReducer";

interface StateProps {
  isLoggedIn: boolean;
}

interface OwnProps {}

type Props = OwnProps & StateProps;

/**
 * Login page
 */
function LoginPage(props: Props) {
  const { isLoggedIn } = props;

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.loginPage}>
      <LoginForm className={styles.form} />
    </div>
  );
}

export default connect((state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
}))(LoginPage);
