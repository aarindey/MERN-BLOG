import React from "react";

const Login = ({ loginWithRedirect }) => {
  return (
    <div>
      <h1>Login</h1>
      <p>You are not logged in. Please login before proceeding.</p>
      <button
        style={{ margin: 5 }}
        type="button"
        onClick={(e) => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
