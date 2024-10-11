import React from "react";
import { EmailIcon, GoogleIcon, VoiceCallIcon } from "./common/Icon";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="bg-[#011e2f] h-screen flex justify-center items-center p-6">
      <div>
        <h2 className="font-medium text-2xl md:text-4xl text-[#0077E5] capitalize">
          get started
        </h2>
        <p className="font-normal text-sm md:text-base text-white/80">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias veniam
          officiis quam.
        </p>
        <div className="mt-8 flex flex-col gap-2.5">
          <span className="font-normal text-sm md:text-base text-white/80">
            login with:
          </span>
          <button className="font-semibold text-white text-lg flex justify-center items-center gap-2 py-1.5 px-3 bg-black/50 rounded-xl capitalize ">
            <VoiceCallIcon /> Phone Number
          </button>
          <button className="font-semibold text-white text-lg flex justify-center items-center gap-2 py-1.5 px-3 bg-black/50 rounded-xl capitalize ">
            <GoogleIcon /> Google
          </button>
          <Link
            to={"email-login"}
            className="font-semibold text-white text-lg flex justify-center items-center gap-2 py-1.5 px-3 bg-black/50 rounded-xl capitalize "
          >
            <EmailIcon /> email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
