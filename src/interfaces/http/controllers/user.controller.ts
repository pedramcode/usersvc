import { NextFunction, Request, Response } from "express";
import { UserLoginDTO, UserRefreshDTO, UserRegisterDTO } from "../dto/user.dto";
import * as z from "zod";
import UserService from "../../../application/services/user.service";

export const userRefreshController = async (req: Request, res: Response) => {
    const content = UserRefreshDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const data = content.data;
    const result = await UserService.refreshCredentials(data.refreshToken);
    return res.status(200).json({ message: result });
};

export const userLoginController = async (req: Request, res: Response) => {
    const content = UserLoginDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const data = content.data;
    const result = await UserService.login({
        password: data.password,
        username: data.username,
    });
    return res.status(200).json({ message: result });
};

export const userRegisterController = async (req: Request, res: Response) => {
    const content = UserRegisterDTO.safeParse(req.body);
    if (!content.success) {
        return res.status(400).json({ error: z.treeifyError(content.error) });
    }
    const data = content.data;
    const result = await UserService.register({
        email: data.email,
        password: data.password,
        step: data.step,
        username: data.username,
        firstname: data.firstname!,
        lastname: data.lastname!,
        otp: data.otp!,
    });
    return res.status(200).json({ message: result });
};
