import { Model } from "mongoose";
import { IAudience } from "../audience/audience.interface";

export interface IMessage {
  sender: string;
  receiver: string;
  content: string;
  contentType: string; // e.g., 'text', 'image', 'video'
  isRead: boolean;
}

export interface IConversation {
  _id: string;
  lastMessage: IMessage;
  unreadCount: number;
  userInfo: IAudience[];
}

export type MessageModel = Model<IMessage, Record<string, unknown>>;
