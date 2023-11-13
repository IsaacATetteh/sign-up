"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
export default function Home() {
  const [currentForm, setCurrentForm] = useState("Login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="page">
      {currentForm === "Login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}
