import mongoose from "mongoose";
import {
    IPermission,
    PermissionModel,
} from "../../infrastructure/database/models/permission.model";
import { AlreadyExistsError, NotFoundError } from "../../shared/errors";
import { IPermissionCreate } from "./dao/permission.dao";

export default class PermissionService {
    static async create(data: IPermissionCreate): Promise<IPermission> {
        const count = await PermissionModel.find({
            name: data.name,
        })
            .countDocuments()
            .exec();
        if (count != 0) {
            throw new AlreadyExistsError(`permission "${data.name}"`);
        }
        const perm = await PermissionModel.create({
            name: data.name,
            desc: data.desc!,
        });
        return perm;
    }

    static async getAll() {
        const perms = await PermissionModel.find().exec();
        return perms;
    }

    static async delete(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundError("permission");
        }
        const deleted = await PermissionModel.deleteOne({ _id: id }).exec();
        if (deleted.deletedCount == 0) {
            throw new NotFoundError("permission");
        }
        return;
    }
}
