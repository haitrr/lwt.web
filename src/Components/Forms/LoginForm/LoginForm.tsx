import {Form} from "antd";
import {Button, TextField} from "@material-ui/core";
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
    <Form className={className} onFinish={handleLogin}>
      <h1>LOGIN</h1>
      <Form.Item name="userName" rules={[{required: true}]}>
        <TextField
          variant="outlined"
          style={{width: "100%", marginBottom: "1rem"}}
          placeholder="User name"
        />
      </Form.Item>
      <Form.Item name="password" rules={[{required: true}]}>
        <TextField
          variant="outlined"
          style={{width: "100%"}}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={loading}
          style={{marginTop: "1rem"}}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, {login: loginAction})(LoginForm);
