import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
      <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
        <Link to={"/profile/" + user?._id} className="flex gap-2">
          <img
            src={user?.profileUrl ?? NoProfile}
            alt={user?.email}
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium text-ascent-1">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-ascent-2">
              {user?.profession ?? "No Profession"}
            </span>
          </div>
          <div>
            {user?._id === data?._id ? (
              <LiaEditSolid size={22} className="text-blue cursor-pointer" />
            ) : (
              <button className="bg-[#0444a430] text-sm text-white p-1 rounded">
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
