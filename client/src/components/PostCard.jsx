import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiSolidLike, BiLike, BiComment } from "react-icons/bi";

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [likes, setLikes] = useState(post?.likes);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?._id) ? (
        <>
          <BiSolidLike size={20} color="blue" />
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <BiSolidLike size={20} />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <BiLike size={20} />
        Like
      </>
    );
  };

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>
        <div className="w-full flex  justify-between">
          <div>
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>
          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.length > 300
            ? `${post?.description.slice(0, 300)}...  `
            : post?.description}
          {post?.description?.length > 300 &&
            (showAll === post?._id ? (
              <span
                className="text-blue font-mediu cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>
        {post?.file && (
          <>
            {post?.file.endsWith(".mp4") ||
            post?.file.endsWith(".webm") ||
            post?.file.endsWith(".wav") ||
            post?.file.endsWith(".gif") ? (
              <video
                src={post?.file}
                controls
                className="w-full mt-2 rounded-lg"
              />
            ) : (
              <img
                src={post?.file}
                alt="post file"
                className="w-full mt-2 rounded-lg"
              />
            )}
          </>
        )}

        <div className="mt-4 flex justify-between items-center pt-2 text-ascent-2 text-base border-t border-[#66666645]">
          <p className="flex gap-2 items-center text-base cursor-pointer">
            <Likes />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
