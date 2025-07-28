import * as z from "zod";

export const ProfileUpdateDTO = z.object({
    bio: z.string().max(256).optional(),
    image: z.string().max(256).optional(),
    birthdate: z.date().optional(),
    job: z.string().max(64).optional(),
    country: z.string().max(32).optional(),
    city: z.string().max(32).optional(),
    bioPublic: z.boolean().default(false),
    imagePublic: z.boolean().default(false),
    birthdatePublic: z.boolean().default(false),
    jobPublic: z.boolean().default(false),
    countryPublic: z.boolean().default(false),
    cityPublic: z.boolean().default(false),
});
export type ProfileUpdateDTOType = z.infer<typeof ProfileUpdateDTO>;
