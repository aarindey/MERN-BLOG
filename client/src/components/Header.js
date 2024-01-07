import React from "react";

const Header = ({ user, loginWithRedirect, isAuthenticated, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <strong>Blog Overflow</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <a className="nav-link active" href="/profile">
                    Welcome, {user.nickname}
                  </a>
                </div>
              ) : (
                <p className="nav-link active">Welcome</p>
              )}
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <a className="nav-link active" href="/profile">
                  Profile
                </a>
              ) : (
                <a className="nav-link active" href="/login">
                  Profile
                </a>
              )}
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <a className="nav-link active" href="/">
                  Home
                </a>
              ) : (
                <a className="nav-link active" href="/login">
                  Home
                </a>
              )}
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <a className="nav-link active" href="/create">
                  Create
                </a>
              ) : (
                <a className="nav-link active" href="/login">
                  Create
                </a>
              )}
            </li>
            <li className="nav-item">
              {!isAuthenticated ? (
                <button
                  onClick={(e) => loginWithRedirect()}
                  className="nav-link active"
                >
                  LogIn
                </button>
              ) : (
                <button onClick={(e) => logout()} className="nav-link active">
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
