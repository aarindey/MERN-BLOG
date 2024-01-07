import React from "react";

const Login = ({ user, loginWithRedirect, isAuthenticated, logout }) => {
  return (
    <div>
      <h1>Login</h1>
      <p>You are not logged in. Please login before proceeding.</p>
      <button type="button" onClick={(e) => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default Login;
