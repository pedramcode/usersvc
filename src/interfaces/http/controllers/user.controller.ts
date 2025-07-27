import { Request, Response } from "express";
import { UserRegisterDTO } from "../dto/user.dto";
import * as z from "zod";

export const userRegisterController = async (req: Request, res: Response) => {
    const content = UserRegisterDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ errors: z.treeifyError(content.error) });
    }
    const data = content.data;
    return data;
};
