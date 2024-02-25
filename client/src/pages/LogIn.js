import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const successToast = () =>
    toast.success("Successfully, logged In!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const failureToast = () =>
    toast.warn("Log In failed. Try again!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const token = "Bearer " + localStorage.getItem("token");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="janedoe@gmail.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
          />
          <InputBox
            placeholder="abc123"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${config.API_URL}/api/users/login`,
                    {
                      username,
                      password,
                    },
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                  );
                  console.log(response);
                  localStorage.setItem("token", response.data.token);
                  successToast();
                  setTimeout(() => {
                    // using window and not useNavigate to force reload
                    window.location.href = "/";
                  }, 2500);

                  // Handle successful response here
                } catch (error) {
                  // Handle error (e.g., show error message to the user)
                  console.error("Error during sign-in:", error);
                  failureToast();
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
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
    </div>
  );
};

export default SignIn;
