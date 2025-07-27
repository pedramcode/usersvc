import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";
import { generateOtp } from "../../../shared/random";

export interface IOtp extends Document {
    code: string;
    isUsed: boolean;
    user: mongoose.Types.ObjectId | IUser;
    context: "REGISTER" | "LOGIN" | "CHANGE" | "OTHER";
    medium: "SMS" | "EMAIL";
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

export const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);
