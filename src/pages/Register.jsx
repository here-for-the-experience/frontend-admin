import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHome } from "react-icons/ai";
import auth from "../auth";
import { useGlobalState } from "../Context";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [address, setAddress] = useState("");
  const [nid, setNid] = useState("");
  const [passError, setPassError] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

  const register = () => {
    const dataToPost = new FormData();
    dataToPost.set("username", email);
    dataToPost.set("password", password);
    if (cpassword !== password) {
      toast.error("Passwords do not match");
      setPassError(true);
    } else {
      auth
        .post("/create", {
          name: name,
          email: email,
          phone_number: phone,
          password: password,
          address: address,
          nid: nid,
          role_id: 2,
        })
        .then(() => {
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
                  console.log(profileResponse);
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
        })
        .catch((err) => console.log(err));
    }
  };

  if (isLoggedIn) window.location.pathname = "/";
  else
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
        <div className="w-full lg:w-5/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg lg:bg-white">
          <div className="lg:m-10">
            <AiOutlineHome
              data-testid="home"
              onClick={() => (window.location.pathname = "/")}
              className="fixed top-5 lg:top-10 left-5 lg:left-10 text-xl lg:text-3xl cursor-pointer"
            />
            <div className="text-center text-2xl mb-4 lg:mb-16 font-medium">
              Register for vaccine
            </div>

            {/* Name and email */}

            <div className="grid lg:grid-cols-3 gap-y-8 gap-x-8 px-5 lg:pr-0">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="phone" className="text-left">
                  Phone
                </Label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  type="text"
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Address and NID */}

            <div className="grid lg:grid-cols-2 gap-y-8 gap-x-8 px-5 lg:pr-0 mt-8">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="address" className="text-left">
                  Address
                </Label>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  type="text"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="nid" className="text-left">
                  NID Number
                </Label>
                <Input
                  onChange={(e) => setNid(e.target.value)}
                  id="nid"
                  type="text"
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Title */}

            {/* <div className="flex items-center gap-x-2 my-4">
            <hr className="w-1/6" />
            <div className="text-gray-500">Credentials</div>
            <hr className="w-5/6" />
          </div> */}

            {/* Password */}

            <div className="grid lg:grid-cols-2 gap-y-8 gap-x-8 px-5 lg:pr-0 mt-8">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="password" className="text-left">
                  Password
                </Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="cpassword" className="text-left">
                  Confirm Password
                </Label>
                <Input
                  onChange={(e) => setCPassword(e.target.value)}
                  id="cpassword"
                  type="password"
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Submit */}

            <div className="flex justify-center mt-8">
              <Button
                onClick={() => register()}
                className="col-start-2 px-16"
                type="button"
              >
                Signup
              </Button>
            </div>
            <div className="flex justify-center gap-x-4 mt-8 px-5">
              <div className="text-gray-500">Already have an account?</div>
              <button
                onClick={() => (window.location.pathname = "/login")}
                className="hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;
