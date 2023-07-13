import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineHome } from "react-icons/ai";
// import auth from "./auth";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    const dataToPost = new FormData();
    dataToPost.set("phone", phone);
    dataToPost.set("password", password);
    // auth
    //   .post("/login", dataToPost)
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.setItem("jwt", res.data.access_token);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center">
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
              <Label htmlFor="phone" className="text-left">
                Phone
              </Label>
              <Input
                data-testid="phone"
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="text"
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
