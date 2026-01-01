import { Schema, model } from "mongoose";
import { IAudience, AudienceModel } from "./audience.interface";

const audienceSchema = new Schema<IAudience, AudienceModel>(
  {
    name: {
      type: String,
      required: true,
    },
    userid: {
      type: String, // Assuming string ID from external source or just a string reference
      required: true,
    },
    isMessageEnabled: {
      type: Boolean,
      default: true, // Default to true as per typical UX
    },
    isCommentEnabled: {
      type: Boolean,
      default: true,
    },
    profile: {
      type: String,
    },
    isAdmin: {
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

export const Audience = model<IAudience, AudienceModel>(
  "Audience",
  audienceSchema
);
