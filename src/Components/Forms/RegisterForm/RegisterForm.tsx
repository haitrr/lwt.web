import {Form, Formik} from "formik";
import {toast} from "react-toastify";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router";
import {connect} from "react-redux";
import {registerAction} from "../../../Actions/UserAction";

interface OwnProps {
}

interface DispatchProps {
  register: Function;
}

interface FormValues {
  userName: string;
  password: string;
  repeatPassword: string;
}

type Props = OwnProps & DispatchProps & RouteComponentProps;

const RegisterForm: React.FC<Props> = ({register}) => {
  const [submitting, setSubmitting] = React.useState(false)
  const history = useHistory()

  const handleRegister = (data: any): Promise<any> => {
    return register(data).then(() => {
      history.push("/login");
    });
  };

  const handleSubmit = (values: FormValues) => {
    if (values.password !== values.repeatPassword) {
      toast.error("Passwords not match");
      return;
    }

    setSubmitting(true)
    handleRegister(values)
      .then(() => {
        history.push("/login");
      })
      .catch((_: Error) => {
        setSubmitting(false)
      })
  };

  return (
    <Formik initialValues={{userName: "", password: "", repeatPassword: ""}} onSubmit={handleSubmit}>
      {({values, handleChange}) => {
        return <Form>
          <TextField
            value={values.userName}
            name="userName"
            onChange={handleChange}
            variant="outlined"
            style={{width: "100%", marginBottom: "1rem"}}
            placeholder="User Name"
          />
          <TextField
            name="password"
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            style={{width: "100%", marginBottom: "1rem"}}
            type="password"
            placeholder="Password"
          />
          <TextField
            name="repeatPassword"
            onChange={handleChange}
            value={values.repeatPassword}
            variant="outlined"
            style={{width: "100%", marginBottom: "1rem"}}
            type="password"
            placeholder="Retype password"
          />
          <Button
            disabled={submitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
      }}
    </Formik>
  );
}

export default withRouter(
  connect(null, {register: registerAction})(RegisterForm)
);
