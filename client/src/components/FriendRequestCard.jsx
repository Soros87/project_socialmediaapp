import React, { useState } from "react";
import { friends } from "../assets/dummyData";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { CustomButton } from "../components";
import { friendRequest as dummyFriends } from "../assets/dummyData";

const FriendRequestCard = () => {
  const [friendRequest, setFriendRequest] = useState(dummyFriends);

  const acceptFriendRequest = async (id, status) => {};
  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
      <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
        <span> Friend Request</span>
        <span>{friendRequest?.length}</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {friendRequest?.map(({ _id, requestFrom: from }, index) => (
          <div className="flex items-center justify-between" key={index + _id}>
            {from && (
              <Link
                to={"/profile/" + from._id}
                key={from?._id}
                className="w-full flex gap-4 items-center cursor-pointer"
              >
                <img
                  src={from?.profileUrl ?? NoProfile}
                  alt={from?.firstName}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex-1 ">
                  <p className="text-base font-medium text-ascent-1">
                    {from?.firstName} {from?.lastName}
                  </p>
                  <span className="text-sm text-ascent-2">
                    {from?.profession ?? "No Profession"}
                  </span>
                </div>
              </Link>
            )}
            <div className="flex gap-1">
              <CustomButton
                onClick={() => acceptFriendRequest(_id, "Accepted")}
                title="Accept"
                containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
              />
              <CustomButton
                title="Deny"
                onClick={() => acceptFriendRequest(_id, "Denied")}
                containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequestCard;
