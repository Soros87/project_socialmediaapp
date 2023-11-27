import React from "react";
import moment from "moment";

const CommentsCard = ({ comments, post }) => {
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
            <p className="text-ascent-2 text-sm">{comment.comment}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsCard;
