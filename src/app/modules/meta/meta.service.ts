import { IMeta } from "./meta.interface";
import { Meta } from "./meta.model";

const upsertMeta = async (payload: IMeta): Promise<IMeta | null> => {
  const result = await Meta.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return result;
};

const getMeta = async (): Promise<IMeta | null> => {
  const result = await Meta.findOne({});
  return result;
};

export const MetaService = {
  upsertMeta,
  getMeta,
};
