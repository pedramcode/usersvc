import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";
import { generateOtp } from "../../../shared/random";
import IWithTimestamps from "../../../shared/types/common";

export interface IOtp extends Document, IWithTimestamps {
    code: string;
    isUsed: boolean;
    user: mongoose.Types.ObjectId | IUser;
    context: "REGISTER" | "LOGIN" | "CHANGE" | "OTHER";
    medium: "SMS" | "EMAIL";

    readonly isExpired: boolean;
}

const otpSchema = new Schema<IOtp>(
    {
        code: {
            type: "string",
            maxlength: 16,
            default: generateOtp,
        },
        isUsed: {
            type: "boolean",
            default: false,
        },
        context: {
            type: "string",
            enum: ["REGISTER", "LOGIN", "CHANGE", "OTHER"],
            required: true,
        },
        medium: {
            type: "string",
            enum: ["SMS", "EMAIL"],
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

otpSchema.virtual("isExpired").get(function (this: IOtp) {
    const now = new Date();
    const createdAt = this.createdAt;
    const ageInMs = now.getTime() - createdAt.getTime();
    return ageInMs > 2 * 60 * 1000;
});

export const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);
