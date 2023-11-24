import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbSocial } from "react-icons/tb";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { CustomButton, TextInput } from "../components";
import { useState } from "react";
import { LOGOUT, THEME } from "../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const TopBar = () => {
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch({ type: THEME, payload: themeValue });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigateTo("/");
    window.location.reload();
    //setUser to null
  };

  const handleSearch = (e) => {};
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          Friends Connect
        </span>
      </Link>
      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <div className="relative flex">
          <TextInput
            placeholder="Search..."
            styles="w-[18rem] lg:w-[38rem]  rounded-l-full py-3 "
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-3 bottom-1 text-[#66666690] rounded-lg border p-2 text-sm"
          >
            <svg
              className="h-4 w-4 text-[#66666690]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={logout}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
