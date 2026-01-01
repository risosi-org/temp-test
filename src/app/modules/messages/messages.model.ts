import { Schema, model } from "mongoose";
import { IMessage, MessageModel } from "./messages.interface";

const messageSchema = new Schema<IMessage, MessageModel>(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      default: "text",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Messages = model<IMessage, MessageModel>(
  "Messages",
  messageSchema
);
