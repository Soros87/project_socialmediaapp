import React from "react";
import { useSelector } from "react-redux";
import { TopBar, Loading, CustomButton } from "../components";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full px-0 lg:px-10 pb-5 md:pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />
    </div>
  );
};

export default Home;
