import React, { useState } from "react";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { CustomButton, TextInput } from "../components";
import { NoProfile } from "../assets";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import { BsFiletypeGif } from "react-icons/bs";
import { Tooltip, Typography } from "@material-tailwind/react";

const PostForm = () => {
  const { isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const [postData, setPostData] = useState({
    selectedFile: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); //event - not to get the refresh in the browser
    //TODO
  };

  return (
    <form className="bg-primary px-4 rounded-lg" onSubmit={handleSubmit}>
      <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="User Image"
          className="w-14 h-14 rounded-full object-cover"
        />

        <TextInput
          styles="w-full rounded-full py-5"
          placeholder="What's on your mind...."
          type="text"
          name="description"
          required=""
          onChange={(e) => setPostData(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <label
          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
          htmlFor="imgUpload"
        >
          <input
            type="file"
            onChange={(e) => setPostData(e.target.files[0])}
            className="hidden"
            id="imgUpload"
            data-max-size="5120"
            accept=".jpg, .png, .jpeg"
          />
          <BiImages />
          <Tooltip
            content={
              <div className="w-10">
                <Typography className="text-[#2c313c] bg-bgColor text-sm inline-block">
                  Upload
                </Typography>
              </div>
            }
          >
            <span className="cursor-pointer relative ">Image</span>
          </Tooltip>
        </label>
        <label
          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
          htmlFor="videoUpload"
        >
          <input
            type="file"
            data-max-size="5120"
            onChange={(e) => setPostData(e.target.files[0])}
            className="hidden"
            id="videoUpload"
            accept=".mp4, .wav"
          />
          <BiSolidVideo />
          <Tooltip
            content={
              <div className="w-10">
                <Typography className="text-[#2c313c] bg-bgColor text-sm inline-block">
                  Upload
                </Typography>
              </div>
            }
          >
            <span className="cursor-pointer relative ">Video</span>
          </Tooltip>
        </label>

        <label
          className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
          htmlFor="vgifUpload"
        >
          <input
            type="file"
            data-max-size="5120"
            onChange={(e) => setPostData(e.target.files[0])}
            className="hidden"
            id="vgifUpload"
            accept=".gif"
          />
          <BsFiletypeGif />
          <Tooltip
            content={
              <div className="w-10">
                <Typography className="text-[#2c313c] bg-bgColor text-sm inline-block">
                  Upload
                </Typography>
              </div>
            }
          >
            <span className="cursor-pointer relative ">Gif</span>
          </Tooltip>
        </label>
        {isLoading ? (
          <Loading />
        ) : (
          <CustomButton
            type="submit"
            title="Post"
            containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
          />
        )}
      </div>
    </form>
  );
};

export default PostForm;
