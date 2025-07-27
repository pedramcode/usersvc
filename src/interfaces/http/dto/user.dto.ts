import * as z from "zod";

export const UserRegisterDTO = z.object({
    username: z.string().max(32),
    password: z.string().max(64).min(6),
    firstname: z.string().max(32).optional(),
    lastname: z.string().max(32).optional(),
    email: z.email(),
    otp: z.string().max(8).optional(),
    step: z.enum(["1", "2"]),
});
export type UserRegisterDTOType = z.infer<typeof UserRegisterDTO>;

export const UserLoginDTO = z.object({
    username: z.string().max(32),
    password: z.string().max(64).min(6),
});
export type UserLoginDTOType = z.infer<typeof UserLoginDTO>;

export const UserRefreshDTO = z.object({
    refreshToken: z.string().max(2048),
});
export type UserRefreshDTOType = z.infer<typeof UserRefreshDTO>;
