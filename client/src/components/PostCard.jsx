import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiComment } from "react-icons/bi";
import { Likes, CommentForm } from "../components";
import { MdOutlineDeleteOutline } from "react-icons/md";

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [likes, setLikes] = useState(post?.likes);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);

  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const handleComments = async (id) => {
    //Do something
    setShowComments(showComments === post._id ? null : post._id);
  };

  const handleLike = async () => {
    //Do something
  };

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      {/* Display post owner detail */}
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
      {/* Display post message detail */}
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
        {/* Display video/img/gifs */}
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
        {/* Display like and comment count */}
        <div className="mt-4 flex justify-between items-center pt-2 text-ascent-2 text-base border-t border-[#66666645]">
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={handleLike}
          >
            <Likes post={post} user={user} />
          </p>
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              handleComments(post?._id);
            }}
          >
            <BiComment size={20} />
            <span className="text-sm">{post?.comments?.length} </span>
            {post?.comments?.length > 1 ? (
              <span className="hidden md:flex text-sm">Comments</span>
            ) : (
              <span className="hidden md:flex text-sm">Comment</span>
            )}
          </p>
          {user?._id === post?.userId?._id && (
            <div
              className="flex gap-1 items-center text-base cursor-pointer"
              onClick={() => deletePost(post?._id)}
            >
              <MdOutlineDeleteOutline size={20} />

              <span className="hidden md:flex text-sm">Delete</span>
            </div>
          )}
        </div>
        {/* Display comment section */}
        {showComments === post?._id && (
          <div className="w-full mt-4 border-t border-[#66666645] pt-4">
            <CommentForm
              user={user}
              id={post?._id}
              handleComments={() => handleComments(post?._id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
