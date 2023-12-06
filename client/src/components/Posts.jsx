import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, PostCard } from "../components";
import { getPosts } from "../actions/posts";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const handleLikePost = async (uri) => {
    //TODO
  };

  const handleDelete = async (id) => {
    //TODO
  };

  const fetchPosts = async () => {
    //TODO
    // dispatch(getPosts());
    //setPosts(res?.data) // res.data is an array of posts
  };

  const getComments = async (id) => {
    //TO DO
  };

  useEffect(() => {
    fetchPosts();
    getComments();
  }, [dispatch]);

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
