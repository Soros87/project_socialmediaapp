import React from "react";
import { useSelector } from "react-redux";
import { Loading, PostCard } from "../components";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comments, isLoading: Loading } = useSelector(
    (state) => state.comment
  );

  const handleLikePost = async (uri) => {};

  const handleDelete = async (id) => {};

  return (
    <>
      {isLoading ? (
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
    </>
  );
};

export default Posts;
