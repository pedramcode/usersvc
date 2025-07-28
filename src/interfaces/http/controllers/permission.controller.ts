import { Request, Response } from "express";
import { PermissionCreateUpdateDTO } from "../dto/permission.dto";
import * as z from "zod";
import PermissionService from "../../../application/services/permission.service";

export const permissionCreateController = async (
    req: Request,
    res: Response,
) => {
    const content = PermissionCreateUpdateDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const data = content.data;
    const result = await PermissionService.create(data);
    return res.status(200).json({ message: result });
};

export const permissionGetAllController = async (
    req: Request,
    res: Response,
) => {
    const result = await PermissionService.getAll();
    return res.status(200).json({ message: result });
};

export const permissionDeleteController = async (
    req: Request,
    res: Response,
) => {
    const id = req.params["id"];
    const result = await PermissionService.delete(id);
    return res.status(204).json({ message: result });
};

export const permissionUpdateController = async (
    req: Request,
    res: Response,
) => {
    const content = PermissionCreateUpdateDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const id = req.params["id"];
    const data = content.data;
    const group = await PermissionService.update(id, {
        name: data.name,
        desc: data.desc,
    });
    return res.status(200).json({ message: group });
};
