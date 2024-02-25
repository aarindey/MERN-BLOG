import React, { useState, useEffect } from "react";
import config from "../config.json";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const successToast = () =>
    toast.success("Logging out!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile("Bearer " + token);
    } else {
      setIsAuth(false);
    }
  }, []);

  const fetchProfile = async (token) => {
    const apiUrl = `${config.API_URL}/api/me`;
    try {
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsAuth(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    successToast();
    setTimeout(() => {
      // using window and not useNavigate to force reload
      window.location.href = "/login";
    }, 2500);
  };

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
            {isAuth && (
              <li className="nav-item">
                <a
                  className="text-gray-800 hover:text-gray-600"
                  href="/profile"
                  aria-current="page"
                >
                  Profile
                </a>
              </li>
            )}
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
            {!isAuth && (
              <li className="nav-item">
                <a
                  className="text-gray-800 hover:text-gray-600"
                  href="/login"
                  aria-current="page"
                >
                  LogIn
                </a>
              </li>
            )}
            {isAuth && (
              <li className="nav-item">
                <button
                  onClick={handleLogOut}
                  className="text-gray-800 hover:text-gray-600 focus:outline-none border-b-2 border-transparent hover:border-gray-500 px-4 py-2"
                >
                  LogOut
                </button>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <a
                  className="text-gray-800 hover:text-gray-600"
                  href="/signup"
                  aria-current="page"
                >
                  SignUp
                </a>
              </li>
            )}
          </ul>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
