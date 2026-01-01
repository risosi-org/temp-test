import { Schema, model } from "mongoose";
import { IMeta, MetaModel } from "./meta.interface";

const metaSchema = new Schema<IMeta, MetaModel>(
  {
    logoUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Meta = model<IMeta, MetaModel>("Meta", metaSchema);
