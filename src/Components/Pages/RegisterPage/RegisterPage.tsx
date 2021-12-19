import React from "react";
import { Redirect } from "react-router";
import RegisterForm from "../../Forms/RegisterForm";
import useUser from "../../../Hooks/useUser";

/**
 * register page
 */
const RegisterPage: React.FC = () => {
  const [user] = useUser();
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        margin: "auto",
        width: "15rem",
        textAlign: "center",
      }}
    >
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
