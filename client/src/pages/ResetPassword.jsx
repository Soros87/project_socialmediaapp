import React, { useState } from "react";
import { CustomButton, Loading, TextInput } from "../components";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  email: "",
};

const ResetPassword = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigateToLogin = () => {
    navigateTo("/login");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignup) {
      //Do signup
    } else {
      //Do login
    }
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg ">
        <p className="text-ascent-1 text-lg font-semibold">Password Reset</p>
        <form className="py-4 flex flex-col gap-5" onSubmit={handleSubmit}>
          <TextInput
            name="email"
            label="Email Address"
            placeholder="email_address_used_during_signup@example.com"
            type="email"
            onChange={handleChange}
            styles="w-full rounded-full"
            labelStyle="ml-2"
            required="field is required"
          />

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title="Reset Password"
            />
          )}
        </form>
        <div className="flex items-start">
          <MdArrowBackIosNew
            onClick={navigateToLogin}
            className={`cursor-pointer hover:opacity-75 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
