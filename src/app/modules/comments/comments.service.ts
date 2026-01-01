import { Comments } from "./comments.model";
import { IComment } from "./comments.interface";

const createComment = async (payload: IComment): Promise<IComment> => {
  const result = await Comments.create(payload);
  return result;
};

const getCommentsByPostId = async (postId: string): Promise<any[]> => {
  const result = await Comments.aggregate([
    { $match: { postId } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "audiences",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      // Fallback if userId is stored as string matching 'userid' field
      $lookup: {
        from: "audiences",
        localField: "userId",
        foreignField: "userid",
        as: "userInfo2",
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: [{ $concatArrays: ["$userInfo", "$userInfo2"] }, 0],
        },
      },
    },
    // Keep userInfo for now as frontend might expect it, or use user.
    // Ideally we standardize. Let's keep 'user' as the populated object.
  ]);
  return result;
};

const getAllComments = async (): Promise<any[]> => {
  // Aggregate to lookup user info
  const result = await Comments.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "audiences", // Look up user info from audiences collection
        localField: "userId",
        foreignField: "_id", // Assuming userId in comment matches _id in audience
        as: "userInfo",
      },
    },
    // Fallback lookup if userId assumes userid field instead of _id
    {
      $lookup: {
        from: "audiences",
        localField: "userId",
        foreignField: "userid",
        as: "userInfo2",
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: [{ $concatArrays: ["$userInfo", "$userInfo2"] }, 0],
        },
      },
    },
    { $unset: ["userInfo", "userInfo2"] },
  ]);
  return result;
};

const deleteComment = async (id: string): Promise<IComment | null> => {
  const result = await Comments.findByIdAndDelete(id);
  return result;
};

const updateComment = async (
  id: string,
  content: string
): Promise<IComment | null> => {
  const result = await Comments.findByIdAndUpdate(
    id,
    { content },
    { new: true }
  );
  return result;
};

export const CommentService = {
  createComment,
  getCommentsByPostId,
  getAllComments,
  deleteComment,
  updateComment,
};
