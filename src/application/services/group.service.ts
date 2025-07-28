import mongoose from "mongoose";
import { IGroupCreateOrUpdate } from "./dao/group.dao";
import {
    AlreadyExistsError,
    BadRequestError,
    NotFoundError,
} from "../../shared/errors";
import {
    IPermission,
    PermissionModel,
} from "../../infrastructure/database/models/permission.model";
import { GroupModel } from "../../infrastructure/database/models/group.model";

const _getPerms = async (data: IGroupCreateOrUpdate) => {
    let perms: IPermission[] = [];
    for (let perm of data.permissions) {
        if (!mongoose.isValidObjectId(perm)) {
            throw new BadRequestError(`${perm} is not a valid permission ID`);
        }
        const obj = await PermissionModel.findOne({ _id: perm });
        if (!obj) {
            throw new NotFoundError(`permission ID ${perm}`);
        }
        perms.push(obj);
    }
    return perms;
};

export default class GroupService {
    static async create(data: IGroupCreateOrUpdate) {
        const count = await GroupModel.find({ name: data.name })
            .countDocuments()
            .exec();
        if (count != 0) {
            throw new AlreadyExistsError(`group "${data.name}"`);
        }
        const group = await GroupModel.create({
            name: data.name,
            desc: data.desc!,
            permissions: await _getPerms(data),
        });
        return group;
    }

    static async getAll() {
        const groups = await GroupModel.find().exec();
        return groups;
    }

    static async update(id: string, data: IGroupCreateOrUpdate) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundError(`group "${id}"`);
        }
        const exists =
            (await GroupModel.find({ _id: id }).countDocuments().exec()) != 0;
        if (!exists) {
            throw new NotFoundError(`group "${id}"`);
        }
        const result = await GroupModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                name: data.name,
                desc: data.desc!,
                permissions: await _getPerms(data),
            },
            { new: true },
        );
        return result;
    }
}
