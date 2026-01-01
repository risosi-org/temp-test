import { Model } from "mongoose";

export interface IMeta {
  logoUrl: string;
  title: string;
  slogan: string;
}

export type MetaModel = Model<IMeta, Record<string, unknown>>;
