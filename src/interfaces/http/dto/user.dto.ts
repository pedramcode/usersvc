import * as z from "zod";

export const UserRegisterDTO = z.object({
    username: z.string().max(32),
    password: z.string().max(64).min(6),
    firstname: z.string().max(32).nullable(),
    lastname: z.string().max(32).nullable(),
    email: z.email(),
    otp: z.string().max(8).nullable(),
    step: z.enum(["1", "2"]),
});

export type UserRegisterDTOType = z.infer<typeof UserRegisterDTO>;
