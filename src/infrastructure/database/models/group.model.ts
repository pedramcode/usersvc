import mongoose, { Document, Schema } from "mongoose";
import IWithTimestamps from "../../../shared/types/common";
import { IPermission } from "./permission.model";

export interface IGroup extends Document, IWithTimestamps {
    name: string;
    desc?: string;
    permissions: mongoose.Types.ObjectId[] | IPermission[];
}

const groupSchema = new Schema<IGroup>({
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
    permissions: [{ type: mongoose.Types.ObjectId, ref: "Permission" }],
});

export const GroupModel = mongoose.model<IGroup>("Group", groupSchema);
