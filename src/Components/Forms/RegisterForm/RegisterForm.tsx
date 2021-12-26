import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { registerAsync } from '../../../Apis/UserApi';

interface OwnProps {}

interface DispatchProps {}

interface FormValues {
  userName: string;
  password: string;
  repeatPassword: string;
}

type Props = OwnProps & DispatchProps;

const RegisterForm: React.FC<Props> = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const history = useHistory();

  const handleRegister = (data: any): Promise<any> => {
    return registerAsync(data).then(() => {
      history.push('/login');
    });
  };

  const handleSubmit = (values: FormValues) => {
    if (values.password !== values.repeatPassword) {
      toast.error('Passwords not match');
      return;
    }

    setSubmitting(true);
    handleRegister(values)
      .then(() => {
        history.push('/login');
      })
      .catch((_: Error) => {
        setSubmitting(false);
      });
  };

  return (
    <Formik initialValues={{ userName: '', password: '', repeatPassword: '' }} onSubmit={handleSubmit}>
      {({ values, handleChange }) => {
        return (
          <Form>
            <TextField
              value={values.userName}
              name="userName"
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder="User Name"
            />
            <TextField
              name="password"
              value={values.password}
              onChange={handleChange}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
              type="password"
              placeholder="Password"
            />
            <TextField
              name="repeatPassword"
              onChange={handleChange}
              value={values.repeatPassword}
              variant="outlined"
              style={{ width: '100%', marginBottom: '1rem' }}
              type="password"
              placeholder="Retype password"
            />
            <Button disabled={submitting} variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
