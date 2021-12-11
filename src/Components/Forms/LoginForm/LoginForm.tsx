import {Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {connect} from "react-redux";
import {loginAction} from "../../../Actions/UserAction";

interface StateProps {
}

interface DispatchProps {
  login: Function;
}

interface OwnProps {
  className: string;
}

type Props = OwnProps & StateProps & DispatchProps;

interface FormValues {
  userName: string;
  password: string;
}

const LoginForm: React.FC<Props> = ({className, login}) => {
  const [loading, setLoading] = useState(false)
  const handleLogin = (data: FormValues) => {
    setLoading(true)
    login(data).then(() => setLoading(false))
  };
  return (
    <Formik initialValues={{userName: "", password: ""}} onSubmit={handleLogin}>
      {({values, handleChange, handleBlur}) => {
        return <Form className={className}>
          <h1>LOGIN</h1>
          <TextField
            required
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            style={{width: "100%", marginBottom: "1rem"}}
            placeholder="User name"
          />
          <TextField
            required
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            variant="outlined"
            style={{width: "100%"}}
            type="password"
            placeholder="Password"
          />
          <Button
            disabled={loading}
            style={{marginTop: "1rem"}}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      }}
    </Formik>
  );
}

export default connect(null, {login: loginAction})(LoginForm);
