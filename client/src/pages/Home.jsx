import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

import {
  TopBar,
  Loading,
  CustomButton,
  ProfileCard,
  FriendsCard,
  SuggestedFriendsCard,
  FriendRequestCard,
  PostForm,
  Posts,
  EditProfile,
} from "../components";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-5 md:pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* Left Side */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-3 overflow-y-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
          {/* Center */}
          <div className="flex-1 h-full px-4 flex flex-col gap-3 overflow-y-auto rounded-xl">
            <PostForm />
            <Posts />
            <div className="block md:hidden">
              <ProfileCard user={user} />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-3 overflow-y-auto">
            {/* Friend's Request */}
            <FriendRequestCard />
            {/* Suggested Friends */}
            <SuggestedFriendsCard />
          </div>
        </div>
      </div>
      {edit && <EditProfile user={user} />}
    </>
  );
};

export default Home;
