import React from "react";
import RegisterForm from "../../Forms/RegisterForm";

/**
 * register page
 */
function RegisterPage() {
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
}

export default RegisterPage;
