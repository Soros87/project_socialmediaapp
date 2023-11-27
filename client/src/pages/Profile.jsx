import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const { posts, isLoading } = useSelector((state) => state.post);
  const [loading, setLoading] = useState(false);
  const { comments } = useSelector((state) => state.comment);

  console.log("selected user", userInfo);
  const handleDelete = async (id) => {
    //TODO
  };

  const handleLikePost = async (uri) => {
    //TODO
  };

  const getUser = async () => {
    //TODO set User info
    // setUserInfo(id);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    //TODO
  }, [id]);
  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-0 md:pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto md:pl-4 lg:pl-0">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>
          {/* CENTER */}
          <div className=" flex-1 h-full bg-orimary flex flex-col gap-6 overflow-y-auto pl-4">
            <div className="block md:hidden">
              <ProfileCard user={userInfo} />
            </div>
            {false ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                  postComments={comments}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>
          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
