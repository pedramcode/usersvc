import * as z from "zod";

export const PermissionCreateDTO = z.object({
    name: z.string().max(32),
    desc: z.string().max(128).optional(),
});
export type PermissionCreateDTOType = z.infer<typeof PermissionCreateDTO>;
