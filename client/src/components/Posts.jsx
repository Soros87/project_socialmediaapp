import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, PostCard } from "../components";
import { getPosts, deletePost } from "../actions/posts";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  //sort the posts with the most recent at the top
  const sortedPosts = [...posts].sort((a, b) => {
    // 'createdAt' is the property holding the timestamp in each post object
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleLikePost = async (uri) => {
    //TODO
  };

  const handleDelete = async (id) => {
    //TODO
    dispatch(deletePost(id));
  };

  const fetchPosts = async () => {
    //TODO
    dispatch(getPosts());

    //setPosts(res?.data) // res.data is an array of posts
  };

  const getComments = async (id) => {
    //TO DO
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : sortedPosts?.length > 0 ? (
        sortedPosts.map((post) => (
          <PostCard
            post={post}
            key={post?._id}
            user={user}
            handleDelete={handleDelete}
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
