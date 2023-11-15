"use client";
import Image from "next/image";
import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./Home";
        }
      });
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#C5E4E7] font-mono">
      <div className="w-[945px] h-[600px] flex  items-center bg-white rounded-lg  drop-shadow-lg ">
        {" "}
        <Image
          src="/bg-sidebar-desktop.svg"
          alt="Splitter"
          width={275}
          height={565}
          className="pl-5"
        />
        <div className=" h-[465px] w-[490px] ml-20 relative">
          <form onSubmit={handleSubmit}>
            <p className="font-bold text-[30px] text-[#052C5F] pb-[5px]">
              Login
            </p>
            <p className="text-[14px] text-gray-400 pb-8">
              Please provide your email address and password.
            </p>
            <label className="text-sm" htmlFor="email">
              <p className=" text-[#052C5F] pb-1 font-medium" id="email">
                Email
              </p>
            </label>
            <input
              className="block border-gray-200 rounded-md h-[38px]  border-2 w-[400px] mb-4"
              type="email"
              value={email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-sm" htmlFor="pass">
              <p className=" text-[#052C5F] font-medium pb-1" id="pass">
                Password
              </p>
            </label>
            <input
              className="block border-gray-200 rounded-md h-[38px]  border-2 w-[400px] mb-4"
              type="password"
              value={password}
              placeholder="*******"
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="absolute bottom-0 right-[232px] ">
              <button
                className="w-[110px] h-[40px] bg-[#174A8A] rounded-lg text-white text-sm"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <a
            className="text-[#174A8A] text-sm mt-2 block underline hover:text-red-500 cursor-pointer"
            onClick={() => props.onFormSwitch("Register")}
          >
            Don't have an account?
          </a>
        </div>
      </div>
    </div>
  );
};
