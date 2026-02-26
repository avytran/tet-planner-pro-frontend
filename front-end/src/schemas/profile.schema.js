import * as yup from "yup";

export const profileSchema = yup.object({
  id: yup.string().required(),
  fullName: yup.string().nullable().default(null),
  email: yup.string().email().required(),
  passwordUpdatedAt: yup.mixed().nullable().default(null),
  createdAt: yup.mixed().nullable().default(null),
  updatedAt: yup.mixed().nullable().default(null),
});

export function parseProfileFromGetProfile(getProfileValue) {
  if (!getProfileValue) return null;
  const candidate = getProfileValue?.data ?? getProfileValue;

  try {
    return profileSchema.validateSync(candidate, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch {
    return null;
  }
}

