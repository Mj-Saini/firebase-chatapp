import React, { useState } from "react";
import {
  CloseEyesIcon,
  EmailIcon,
  LockIcon,
  OpenEyesIcon,
} from "../common/Icon";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const EmailLogin = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    eyes: false,
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const toggleEyes = () => {
    setAuth((prev) => ({ ...prev, eyes: !prev.eyes }));
  };

  const firebaseAuth = async () => {
    try {
      const authInstance = getAuth(app);
      await createUserWithEmailAndPassword(
        authInstance,
        auth.email,
        auth.password
      ).then((login) => {
        localStorage.setItem("user", login);
      });
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
  };

  const handleSumbit = (e) => {
    const login = localStorage.getItem("user");
    e.preventDefault();
    console.log(auth);
    firebaseAuth();
    setAuth({
      email: "",
      password: "",
    });
    if (login) {
      navigate("/chat-room");
    }
  };

  return (
    <div className="bg-[#011e2f] h-screen flex justify-center items-center p-6">
      <form
        onSubmit={handleSumbit}
        className="w-full flex flex-col gap-2.5 max-w-[400px] mx-auto"
      >
        <div className="flex items-center gap-2 py-1.5 px-2 bg-black/50 rounded-xl capitalize w-full">
          <span>
            <EmailIcon />
          </span>
          <input
            onChange={handleChange}
            value={auth.email}
            name="email"
            className="font-semibold text-white text-lg bg-transparent border-0 outline-none placeholder:capitalize w-full"
            type="email"
            placeholder="enter your email"
          />
        </div>
        <div className="flex items-center justify-between gap-2 py-1.5 px-2 bg-black/50 rounded-xl capitalize w-full">
          <div className="flex gap-2 items-center">
            <span>
              <LockIcon />
            </span>
            <input
              onChange={handleChange}
              value={auth.password}
              type={`${auth.eyes ? "password" : "text"}`}
              className="font-semibold text-white text-lg bg-transparent border-0 outline-none placeholder:capitalize w-full"
              name="password"
              placeholder="enter your password"
            />
          </div>
          {auth.eyes ? (
            <span onClick={toggleEyes}>
              <CloseEyesIcon />
            </span>
          ) : (
            <span onClick={toggleEyes}>
              <OpenEyesIcon />
            </span>
          )}
        </div>
        <button className="border border-white  text-white py-2 px-6">
          submit
        </button>
      </form>
    </div>
  );
};

export default EmailLogin;
