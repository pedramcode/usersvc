import * as z from "zod";

export const GroupCreateUpdateDTO = z.object({
    name: z.string().max(32),
    desc: z.string().max(128).optional(),
    permissions: z.array(z.string()),
});
export type GroupCreateUpdateDTOType = z.infer<typeof GroupCreateUpdateDTO>;

export const GroupAssignDTO = z.object({
    username: z.string().max(32),
    groups: z.array(z.string()),
});
export type GroupAssignDTOType = z.infer<typeof GroupAssignDTO>;
