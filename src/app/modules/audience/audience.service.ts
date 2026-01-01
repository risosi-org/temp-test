import { Audience } from "./audience.model";
import { IAudience } from "./audience.interface";

const createAudience = async (
  payload: IAudience
): Promise<{ audience: IAudience; isNew: boolean }> => {
  // Check if audience already exists by userId
  const existingAudience = await Audience.findOne({ userid: payload.userid });

  if (existingAudience) {
    return { audience: existingAudience, isNew: false };
  }

  const result = await Audience.create(payload);
  return { audience: result, isNew: true };
};

const getAllAudiences = async (): Promise<IAudience[]> => {
  const result = await Audience.find();
  return result;
};

const getAudienceById = async (id: string): Promise<IAudience | null> => {
  const result = await Audience.findById(id);
  return result;
};

const updateAudience = async (
  id: string,
  payload: Partial<IAudience>
): Promise<IAudience | null> => {
  const result = await Audience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAudience = async (id: string): Promise<IAudience | null> => {
  const result = await Audience.findByIdAndDelete(id);
  return result;
};

const checkMessageEnabled = async (
  id: string
): Promise<{ isMessageEnabled: boolean } | null> => {
  const audience = await Audience.findOne({ userid: id }).select(
    "isMessageEnabled"
  );
  if (!audience) {
    return null;
  }
  return { isMessageEnabled: audience.isMessageEnabled };
};

const checkCommentEnabled = async (
  id: string
): Promise<{ isCommentEnabled: boolean } | null> => {
  const audience = await Audience.findOne({ userid: id }).select(
    "isCommentEnabled"
  );
  if (!audience) {
    return null;
  }
  return { isCommentEnabled: audience.isCommentEnabled };
};

const getAdminAudience = async (): Promise<IAudience | null> => {
  const result = await Audience.findOne({ isAdmin: true });
  return result;
};

const upsertAdminAudience = async (
  payload: Partial<IAudience>
): Promise<IAudience | null> => {
  const result = await Audience.findOneAndUpdate(
    { isAdmin: true },
    { ...payload, isAdmin: true },
    { upsert: true, new: true, runValidators: true }
  );
  return result;
};

export const AudienceService = {
  createAudience,
  getAllAudiences,
  getAudienceById,
  updateAudience,
  deleteAudience,
  checkMessageEnabled,
  checkCommentEnabled,
  getAdminAudience,
  upsertAdminAudience,
};
