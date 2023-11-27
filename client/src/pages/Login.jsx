import React from "react";
import { TbSocial } from "react-icons/tb";
import { TextInput, CustomButton } from "../components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BgImg } from "../assets";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { AiFillEyeInvisible } from "react-icons/ai";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      //TODO signup
    } else {
      //TODO login
    }
  };
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div
        className={`w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl ${
          isSignup ? "flex-row-reverse" : ""
        }`}
      >
        {/* Left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6 mt-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-blue font-semibold">
              FriendsConnect
            </span>
          </div>
          {isSignup ? (
            <>
              <p className="text-ascent-1 text-base font-semibold">
                Join our community
              </p>
              <span className="text-sm mt-2 text-ascent-2">
                Let's get you started
              </span>
            </>
          ) : (
            <>
              <p className="text-ascent-1 text-base font-semibold">
                Log in to your account
              </p>
              <span className="text-sm mt-2 text-ascent-2">Welcome back</span>
            </>
          )}

          <form className="py-8 flex flex-col gap-0.5" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <TextInput
                  name="firstName"
                  label="First Name"
                  placeholder="first name"
                  type="text"
                  onChange={handleChange}
                  styles="w-full rounded-full"
                  labelStyle="ml-2"
                  required="field is required"
                />
                <TextInput
                  name="lastName"
                  label="Last Name"
                  placeholder="last name"
                  type="text"
                  onChange={handleChange}
                  styles="w-full rounded-full"
                  labelStyle="ml-2"
                  required="field is required"
                />
              </>
            )}
            <TextInput
              name="email"
              label="Email Address"
              placeholder="email@example.com"
              type="email"
              onChange={handleChange}
              styles="w-full rounded-full"
              labelStyle="ml-2"
              required="field is required"
            />
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2 justify-between">
              <div className="flex flex-col item-center relative w-full">
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="absolute right-3 bottom-4 ml-3 mt-3 h-5 w-5"
                    color="gray"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <BiShow
                    className=" absolute right-3 bottom-4 ml-3 mt-3 h-5 w-5"
                    color="gray"
                    onClick={handleShowPassword}
                  />
                )}

                <TextInput
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  styles="w-full rounded-full"
                  labelStyle="ml-2"
                  onChange={handleChange}
                  required="field is required"
                />
              </div>

              {isSignup ? (
                <div className="flex flex-col item-center relative w-full">
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-3 bottom-4 ml-3 mt-3 h-5 w-5"
                      color="gray"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <BiShow
                      className=" absolute right-3 bottom-4 ml-3 mt-3 h-5 w-5"
                      color="gray"
                      onClick={handleShowPassword}
                    />
                  )}
                  <TextInput
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    styles="w-full rounded-full"
                    labelStyle="ml-2"
                    onChange={handleChange}
                    required="field is required"
                  />
                </div>
              ) : null}
            </div>
            {isSignup ? (
              <div className="m-3"></div>
            ) : (
              <div className="m-3">
                <Link
                  to="/reset-password"
                  className="text-sm text-right text-blue font-semibold"
                >
                  Forgot Password ?
                </Link>
              </div>
            )}

            {isSubmitting ? (
              ""
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title={isSignup ? "Sign up" : "Login"}
              />
            )}
            {isSignup ? (
              <div className="text-ascent-2 text-sm text-center py-3">
                Already have an account?{" "}
                <div
                  className="text-ascent-2 font-medium hover:underline"
                  onClick={switchMode}
                >
                  Sign in
                </div>
              </div>
            ) : (
              <div className="text-ascent-2 text-sm text-center py-3">
                Don’t have an account yet?{" "}
                <div
                  className="text-ascent-2 font-medium hover:underline"
                  onClick={switchMode}
                >
                  Sign up
                </div>
              </div>
            )}
          </form>
        </div>
        {/* Right */}
        <div className="hidden w-1/2 full lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImg}
              alt="bg"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />
            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
              <AiOutlineInteraction />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friends & have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
