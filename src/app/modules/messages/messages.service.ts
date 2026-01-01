import { Messages } from "./messages.model";
import { IMessage, IConversation } from "./messages.interface";
import { Audience } from "../audience/audience.model";

const createMessage = async (payload: IMessage): Promise<IMessage> => {
  const result = await Messages.create(payload);
  return result;
};

const getMessages = async (otherUserId: string): Promise<IMessage[]> => {
  const adminUser = await Audience.findOne({ isAdmin: true });

  if (!adminUser) {
    throw new Error("Admin user not found in audience");
  }

  const userId = adminUser.userid;
  // Get chat history between two users
  const result = await Messages.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });
  return result;
};

const markAsRead = async (id: string): Promise<IMessage | null> => {
  const result = await Messages.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
  return result;
};

const getConversations = async (): Promise<IConversation[]> => {
  // Find the admin user in audience collection
  const adminUser = await Audience.findOne({ isAdmin: true });

  if (!adminUser) {
    throw new Error("Admin user not found in audience");
  }

  const adminUserId = adminUser.userid;

  const result = await Messages.aggregate<IConversation>([
    {
      $match: {
        $or: [{ sender: adminUserId }, { receiver: adminUserId }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", adminUserId] }, "$receiver", "$sender"],
        },
        lastMessage: { $first: "$$ROOT" },
        unreadCount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$receiver", adminUserId] },
                  { $eq: ["$isRead", false] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $lookup: {
        from: "audiences",
        localField: "_id",
        foreignField: "userid",
        as: "userInfo",
      },
    },
    {
      $sort: { "lastMessage.createdAt": -1 },
    },
  ]);
  return result;
};

const markConversationAsRead = async (otherUserId: string): Promise<any> => {
  const adminUser = await Audience.findOne({ isAdmin: true });
  if (!adminUser) {
    throw new Error("Admin user not found in audience");
  }
  const adminUserId = adminUser.userid;

  const result = await Messages.updateMany(
    {
      sender: otherUserId,
      receiver: adminUserId,
      isRead: false,
    },
    {
      $set: { isRead: true },
    }
  );
  return result;
};

export const MessageService = {
  createMessage,
  getMessages,
  markAsRead,
  getConversations,
  markConversationAsRead,
};
