import React, { useState } from "react";
import TextInput from "./TextInput";
import { Loading, CustomButton } from "../components";
import { BiSend } from "react-icons/bi";

const CommentForm = ({ user, id, replyAt, handleComments }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="w-full border-b border-[#66666645]"
      onSubmit={handleComments}
    >
      <div className="w-full flex items-center gap-2 py-4 ">
        <img
          src={user?.profileUrl}
          alt="User Image"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex relative w-full">
          <TextInput
            styles="w-full rounded-full py-3"
            placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
            type="text"
            name="comment"
            required=""
          />
          <div className="flex items-end justify-end pb-2 absolute right-3 top-4 bottom-1.5 text-[#66666690] text-xl">
            {loading ? (
              <Loading />
            ) : (
              <button onClick={handleComments}>
                {" "}
                <BiSend />
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
