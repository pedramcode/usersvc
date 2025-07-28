import * as z from "zod";

export const PermissionCreateUpdateDTO = z.object({
    name: z.string().max(32),
    desc: z.string().max(128).optional(),
});
export type PermissionCreateUpdateDTOType = z.infer<
    typeof PermissionCreateUpdateDTO
>;
