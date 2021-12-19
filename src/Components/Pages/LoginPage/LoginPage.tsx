import { Redirect } from "react-router";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import useUser from "../../../Hooks/useUser";

interface StateProps {
}

interface OwnProps {}

type Props = OwnProps & StateProps;

/**
 * Login page
 */
function LoginPage(props: Props) {
  const [user] = useUser();

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.loginPage}>
      <LoginForm className={styles.form} />
    </div>
  );
}

export default LoginPage;
