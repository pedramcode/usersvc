import { Request, Response } from "express";
import { GroupCreateUpdateDTO } from "../dto/group.dto";
import * as z from "zod";
import GroupService from "../../../application/services/group.service";
import { GroupModel } from "../../../infrastructure/database/models/group.model";

export const groupCreateController = async (req: Request, res: Response) => {
    const content = GroupCreateUpdateDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const data = content.data;
    const group = await GroupService.create({
        name: data.name,
        desc: data.desc,
        permissions: data.permissions,
    });
    return res.status(200).json({ message: group });
};

export const groupGetAllController = async (req: Request, res: Response) => {
    const groups = await GroupService.getAll();
    return res.status(200).json({ message: groups });
};

export const groupUpdateController = async (req: Request, res: Response) => {
    const content = GroupCreateUpdateDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const id = req.params["id"];
    const data = content.data;
    const group = await GroupService.update(id, {
        name: data.name,
        desc: data.desc,
        permissions: data.permissions,
    });
    return res.status(200).json({ message: group });
};

export const groupDeleteController = async (req: Request, res: Response) => {
    const id = req.params["id"];
    const result = await GroupService.delete(id);
    return res.status(204).json({ message: result });
};
