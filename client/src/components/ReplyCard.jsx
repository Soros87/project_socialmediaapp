import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { LikesReply } from "../components";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ReplyCard = ({ reply, user, handleLike, handleDelete }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply.from}
            className="w-7 h-7 rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-row w-full items-center">
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">{reply?.from}</p>
          </Link>
          <span className="px-2 text-ascent-2 text-sm">
            {moment(reply?.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="ml-10">
        <p className="text-ascent-2 text-sm">{reply?.reply}</p>
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
            onClick={handleLike}
          >
            <LikesReply reply={reply} user={user} />
          </p>
          {user?._id === reply?.userId?._id && (
            <div
              className="flex gap-1 items-center text-base cursor-pointer"
              onClick={() => handleDelete} //FIXME
            >
              <MdOutlineDeleteOutline size={20} />

              <span className="hidden md:flex text-sm">Delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
