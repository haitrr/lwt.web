import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import RegisterForm from "../../Forms/RegisterForm";
import { RootState } from "../../../RootReducer";

/**
 * register page
 */
const RegisterPage: React.FC = () => {
  const isLoggedIn = useSelector<RootState>((state) => state.user.isLoggedIn);
  if (isLoggedIn) {
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
