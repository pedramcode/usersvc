import mongoose, { Document, Schema } from "mongoose";
import IWithTimestamps from "../../../shared/types/common";

export interface IPermission extends Document, IWithTimestamps {
    name: string;
    desc?: string;
}

const permissionSchema = new Schema<IPermission>({
    name: {
        type: "string",
        maxlength: 32,
        unique: true,
    },
    desc: {
        type: "string",
        required: false,
        maxlength: 128,
    },
});

export const PermissionModel = mongoose.model<IPermission>(
    "Permission",
    permissionSchema,
);
