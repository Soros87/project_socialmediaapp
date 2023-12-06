import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { TextInput, Loading, CustomButton } from "../components";
import { BiImages } from "react-icons/bi";
import { UPDATEPROFILE } from "../constants/actionTypes";

import { NoProfile } from "../assets";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleClose = () => {
    // TODO reset();
    dispatch({ type: UPDATEPROFILE, payload: false });
  };

  const handleSubmit = () => {
    //TODO
  };

  const handleChange = () => {
    //TODO
  };

  return (
    <>
      {/*Modal */}
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-[#000] opacity-70"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex justify-between px-6 pt-5 pb-2">
              <label
                htmlFor="name"
                className="block font-medium text-xl text-ascent-1 text-left"
              >
                Edit Profile
              </label>

              <button className="text-ascent-1" onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <form
              className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row w-full items-start">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt={user?.email}
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex flex-col justify-center">
                    <span className="text-lg font-medium text-ascent-1 ml-4">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <div className="flex flex-row"></div>
                  </div>
                </div>
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages className="text-ascent-2 ml-4 cursor-pointer" />
                </label>
                <span className="text-ascent-1  text-sm ml-2">
                  Choose Profile Picture
                </span>
              </div>
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
              <TextInput
                name="profession"
                label="profession"
                placeholder="profession"
                type="text"
                onChange={handleChange}
                styles="w-full rounded-full"
                labelStyle="ml-2"
                required="field is required"
              />
              <TextInput
                name="location"
                label="location"
                placeholder="location"
                type="text"
                onChange={handleChange}
                styles="w-full rounded-full"
                labelStyle="ml-2"
                required="field is required"
              />
              <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                    title="Submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
