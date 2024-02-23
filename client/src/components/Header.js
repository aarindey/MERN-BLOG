import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <strong>IntelliBlog Hub</strong>
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
        <div id="navbarSupportedContent">
          <ul className="flex flex-row items-center space-x-4 ml-auto">
            <li className="nav-item">
              <a
                className="text-gray-800 hover:text-gray-600"
                href="/login"
                aria-current="page"
              >
                LogIn
              </a>
            </li>
            <li className="nav-item">
              <a
                className="text-gray-800 hover:text-gray-600"
                href="/signup"
                aria-current="page"
              >
                SignUp
              </a>
            </li>
            <li className="nav-item">
              <a
                className="text-gray-800 hover:text-gray-600"
                href="/"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="text-gray-800 hover:text-gray-600" href="/create">
                Create
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
