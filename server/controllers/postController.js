import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Comments from "../models/commentModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    const { description, selectedFile } = req.body;

    if (!description) {
      next("please provide a description");
      return;
    }

    const newPost = await Posts.create({
      userId,
      description,
      selectedFile,
    });

    res.status(201).json({ posts: newPost });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    const user = await Users.findById(userId);
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId);

    const searchPostQuery = {
      $or: [
        {
          description: { $regex: search, $options: "i" },
        },
      ],
    };

    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    const friendsPosts = posts?.filter((post) => {
      return friends.includes(post?.userId?._id.toString());
    });

    const otherPosts = posts?.filter(
      (post) => !friends.includes(post?.userId?._id.toString())
    );

    let postsRes = null;

    if (friendsPosts?.length > 0) {
      postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    } else {
      postsRes = posts;
    }

    res.status(200).json(postsRes);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//FIXME getPostsBySearch
export const getPostsBySearch = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    // Fetching the user's details
    const user = await Users.findById(userId);

    // Fetching the user's friends and pushing to an array
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId);

    // Building the query to search for posts based on the description
    const searchPostQuery = {
      $or: [{ description: { $regex: search, $options: "i" } }],
    };

    // Fetching posts from the database based on the search query (if provided)
    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    // Filtering posts based on whether the user is a friend
    const friendsPosts = posts.filter((post) => {
      return friends.includes(post?.userId?._id.toString());
    });
    // Filtering posts that are not from friends
    const otherPosts = posts?.filter((post) => {
      !friends.includes(post?.userId?._id.toString());
    });

    let postsRes = null;
    // Determining the response based on friend posts and other posts
    // if the user is performing a search and there are friend posts available (friendsPosts), the response will contain only those friend posts (friendsPosts).
    //If search is falsy, it combines two arrays friendsPosts and otherPosts into a single array.
    if (friendsPosts?.length > 0) {
      postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    } else {
      postsRes = posts;
    }
    // Sending the response back to the client
    res.status(200).json({
      data: postsRes,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    //fetch post by id
    const post = await Posts.findById(id)
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "firstName lastName location profileUrl -password",
        },
        options: {
          sort: "-_id",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "replies.userId",
          select: "firstName lastName location profileUrl -password",
        },
      });

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      comments: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params; //id = postId
    const { userId } = req.body.user;

    //implemented only after user authenticated and middleware is available
    if (!userId) {
      return res.json({ message: "Unauthenticated" });
    }
    //check if post id is valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await Posts.findById(id);

    //check the index of the userId in the post
    const index = post.likes.findIndex((uid) => uid === String(userId));

    //check if the post has already been liked
    if (index === -1) {
      //like post
      post.likes.push(userId);
    } else {
      //unlike post
      post.likes = post.likes.filter((id) => id !== String(userId));
    }
    //update post
    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    // Sending the response back to the client
    res.status(200).json({
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePostComment = async (req, res) => {
  const { userId } = req.body.user;
  //get the id of the comment or the reply
  const { id, rid } = req.params;

  try {
    //checks whether request is for a comment or a reply
    if (rid === undefined || rid === null || rid === `false`) {
      const comment = await Comments.findById(id);
      //find the index of the userId in the comment.likes array
      const index = comment.likes.findIndex((el) => el === String(userId));
      //check if the comment has already been liked
      if (index === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes = comment.likes.filter((i) => i !== String(userId));
      }
      //update comment
      const updatedPost = await Comments.findByIdAndUpdate(id, comment, {
        new: true,
      });
      //send back the response
      res.status(201).json({
        post: updatedPost,
      });
    } else {
      //user wants to like a reply
      //find the comment that matches the commentId (id) and the replies id matches the rid
      const replyComments = await Comments.findOne(
        { _id: id },
        {
          replies: {
            $elemMatch: {
              _id: rid,
            },
          },
        }
      );
      //check the index of the userId in the comment likes array
      const index = replyComments?.replies[0]?.likes.findIndex(
        (i) => i === String(userId)
      );
      //check if the reply comment has already been liked
      if (index === -1) {
        replyComments.replies[0].likes.push(userId);
      } else {
        replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
          (i) => i !== String(userId)
        );
      }

      const query = { _id: id, "replies._id": rid };

      const updated = {
        $set: {
          "replies.$.likes": replyComments.replies[0].likes, //TODO To test this code whether this step is needed
        },
      };

      const result = await Comments.updateOne(query, updated, { new: true });

      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { comment, from } = req.body; //from - name of the user who posted the comment
    const { userId } = req.body.user;
    const { id } = req.params; //postId

    //check if comment is null or empty
    if (comment === null) {
      next("comment is required");
      return;
    }
    //create the comment
    const newComment = new Comments({ comment, from, userId, postId: id });

    await newComment.save();

    //updating the post.comments[] with the comments id
    const post = await Posts.findById(id);
    post.comments.push(newComment._id);

    await Posts.findByIdAndUpdate(id, post, { new: true });

    res.status(201).json({
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const replyPostComment = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params; //comments id
    const { reply, replyAt, from } = req.body; //TODO understand what replyAt is. Seems to be a name

    if (reply === null) {
      next("reply is required");
    }

    const commentInfo = await Comments.findById(id);

    commentInfo.replies.push({
      reply,
      replyAt,
      from,
      userId,
    });

    commentInfo.save();

    res.status(200).json({
      comment: commentInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Posts.findByIdAndDelete(id);
    //delete all comments and replies associated with the post
    res.status(200).json({ success: true, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
