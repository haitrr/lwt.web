import {Form} from "antd";
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
      .catch((e: Error) => {
        setSubmitting(false)
      })
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="userName">
        <TextField
          variant="outlined"
          style={{width: "100%", marginBottom: "1rem"}}
          placeholder="User Name"
        />
      </Form.Item>
      <Form.Item name="password">
        <TextField
          variant="outlined"
          style={{width: "100%", marginBottom: "1rem"}}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="repeatPassword">
        <TextField
          variant="outlined"
          style={{width: "100%", marginBottom: "1rem"}}
          type="password"
          placeholder="Retype password"
        />
      </Form.Item>
      <Button
        disabled={submitting}
        variant="contained"
        color="primary"
        type="submit"
      >
        Register
      </Button>
    </Form>
  );
}

export default withRouter(
  connect(null, {register: registerAction})(RegisterForm)
);
