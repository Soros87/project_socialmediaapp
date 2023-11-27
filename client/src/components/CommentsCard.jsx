import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

const CommentsCard = ({ comments, post, user }) => {
  const handleLikeComment = (comment) => {
    //TODO something
  };

  return (
    <>
      <div className="text-l inline">
        <h2 className="text-l font-bold">
          {post?.comments?.length}{" "}
          {post?.comments?.length === 1 ? "Comment" : "Comments"}
        </h2>
      </div>
      {comments[0]?.map((comment, index) => (
        <div key={index} className="w-full py-2'">
          <div className="flex gap-3 items-center mb-1">
            <Link to={"/profile/" + comment?.userId?._id}>
              <img
                src={comment?.userId?.profileUrl ?? NoProfile}
                alt={comment?.userId?.firstName}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
            <div className="flex flex-row w-full items-center">
              <Link to={"/profile/" + comment?.userId?._id}>
                <p className="font-medium text-base text-ascent-1">
                  {comment?.userId?.firstName} {comment?.userId?.lastName}
                </p>
              </Link>
              <span className="text-ascent-2 text-sm ml-2">
                {moment(comment?.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="ml-12">
            <p className="text-ascent-2 text-sm">{comment.comment}</p>
            <div className="mt-2 flex gap-6">
              <p
                className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
                onClick={() => {
                  handleLikeComment(comment);
                }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsCard;
