import { Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { loginAsync } from '../../../Apis/UserApi';
import { UserContext } from '../../../App';

interface StateProps {}

interface DispatchProps {}

interface OwnProps {
  className: string;
}

type Props = OwnProps & StateProps & DispatchProps;

interface FormValues {
  userName: string;
  password: string;
}

const LoginForm: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [, , login] = useContext(UserContext);
  const handleLogin = (data: FormValues) => {
    setLoading(true);
    loginAsync(data)
      .then((token) => login(token))
      .finally(() => setLoading(false));
  };
  return (
    <Formik initialValues={{ userName: '', password: '' }} onSubmit={handleLogin}>
      {({ values, handleChange, handleBlur }) => {
        return (
          <Form className={className}>
            <h1>LOGIN</h1>
            <TextField
              required
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder="User name"
            />
            <TextField
              required
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              variant="outlined"
              style={{ width: '100%' }}
              type="password"
              placeholder="Password"
            />
            <Button disabled={loading} style={{ marginTop: '1rem' }} variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
