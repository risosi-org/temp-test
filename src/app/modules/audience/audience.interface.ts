import { Model } from "mongoose";

export interface IAudience {
  name: string;
  userid: string;
  isMessageEnabled: boolean;
  isCommentEnabled: boolean;
  profile?: string;
  isAdmin?: boolean;
}

export type AudienceModel = Model<IAudience, Record<string, unknown>>;
