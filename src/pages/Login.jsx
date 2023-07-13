import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineHome } from "react-icons/ai";
import { useGlobalState } from "../Context";
import auth from "../auth";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import auth from "./auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const { state } = useLocation();
  const login = () => {
    const dataToPost = new FormData();
    dataToPost.set("username", email);
    dataToPost.set("password", password);
    auth
      .post("/login", dataToPost)
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.data.access_token);
        auth
          .get("/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then((profileResponse) => {
            let toUpdateKeys = [
              "id",
              "name",
              "email",
              "address",
              "phone",
              "role_id",
              "verified",
            ];
            let profile = profileResponse.data;
            Object.keys(user).forEach((k) => {
              if (toUpdateKeys.includes(k)) {
                user[k] = profile[k];
              }
            });
            setUser(user);
            setIsLoggedIn(true);
            window.location.pathname = "/";
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    state === "redirected" ? toast.error("You are unauthorized") : "";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full lg:w-2/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg lg:bg-white">
        <AiOutlineHome
          data-testid="home"
          onClick={() => (window.location.pathname = "/")}
          className="fixed top-5 lg:top-10 left-5 lg:left-10 text-xl lg:text-3xl cursor-pointer"
        />
        <div className="lg:m-10">
          <div className="text-center text-2xl mb-4 lg:mb-8 font-medium">
            Log in to your account
          </div>
          <div className="flex flex-col gap-y-4 px-5 lg:pr-0">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                data-testid="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <Input
                data-testid="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                className="col-span-3"
              />
            </div>
            <button className="hover:underline text-right">
              Forgot password?
            </button>
            <div className="flex justify-center">
              <Button
                onClick={() => login()}
                className="col-start-2 px-16"
                type="submit"
              >
                Login
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Need an account?</div>
              <button
                onClick={() => (window.location.pathname = "/register")}
                className="hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
