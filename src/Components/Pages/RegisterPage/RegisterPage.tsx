import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import RegisterForm from '../../Forms/RegisterForm';
import { UserContext } from '../../../App';

/**
 * register page
 */
const RegisterPage: React.FC = () => {
  const [user] = useContext(UserContext);
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        margin: 'auto',
        width: '15rem',
        textAlign: 'center',
      }}
    >
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
