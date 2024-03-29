import { Redirect } from 'react-router';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../../App';

/**
 * Login page
 */
function LoginPage() {
  const [user] = useContext(UserContext);

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.loginPage}>
      <LoginForm className={styles.form} />
    </div>
  );
}

export default LoginPage;
