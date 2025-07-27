import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";
import IWithTimestamps from "../../../shared/types/common";

export interface IUser extends Document, IWithTimestamps {
    username: string;
    passwordHash: string;
    email: string;
    isEmailVerified: boolean;
    isSuperuser: boolean;
    firstname?: string;
    lastname?: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: "string",
            required: true,
            unique: true,
            maxlength: 32,
        },
        passwordHash: {
            type: "string",
            required: true,
            maxlength: 64,
            set: (val: string) => {
                return crypto.createHash("sha256").update(val).digest("hex");
            },
        },
        email: {
            type: "string",
            maxlength: 64,
            unique: true,
        },
        isEmailVerified: {
            type: "boolean",
            default: false,
        },
        isSuperuser: {
            type: "boolean",
            default: false,
        },
        firstname: {
            type: "string",
            required: false,
            maxlength: 32,
        },
        lastname: {
            type: "string",
            required: false,
            maxlength: 32,
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
