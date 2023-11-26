import React, { useState } from "react";
import { BiSolidLike, BiLike } from "react-icons/bi";

const Likes = ({ post, user }) => {
  const [likes, setLikes] = useState(post?.likes);
  const likeIconStyle = {
    fontSize: "20px",
    color: "#065AD8", // Apply blue color directly as a style
  };
  if (likes.length > 0) {
    return likes.find((like) => like === user?._id) ? (
      <>
        <BiSolidLike style={likeIconStyle} />
        <span className="text-sm">
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </span>
      </>
    ) : (
      <>
        <BiSolidLike style={likeIconStyle} />
        <span className="text-sm">
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </span>
      </>
    );
  }
  return (
    <>
      <BiLike style={likeIconStyle} />
      <span className="text-sm">Like</span>
    </>
  );
};

export default Likes;
