import { Request, Response } from "express";
import { ProfileUpdateDTO } from "../dto/profile.dto";
import * as z from "zod";
import ProfileService from "../../../application/services/profile.service";

export const profileUpdateController = async (req: Request, res: Response) => {
    const content = ProfileUpdateDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const username = res.locals["username"] as string;
    const data = content.data;
    const result = await ProfileService.update(username, data);
    return res.status(200).json({ message: result });
};

export const profileGetMeController = async (req: Request, res: Response) => {
    const username = res.locals["username"] as string;
    const result = await ProfileService.get(username, false);
    return res.status(200).json({ message: result });
};

export const profileGetOtherController = async (
    req: Request,
    res: Response,
) => {
    const username = req.params["username"] as string;
    const result = await ProfileService.get(username, true);
    return res.status(200).json({ message: result });
};
