import mongoose, { Document, Schema } from "mongoose";
import IWithTimestamps from "../../../shared/types/common";
import { IUser } from "./user.model";

export interface IProfile extends Document, IWithTimestamps {
    bio?: string;
    image?: string;
    birthdate?: Date;
    job?: string;
    country?: string;
    city?: string;
    bioPublic: boolean;
    imagePublic: boolean;
    birthdatePublic: boolean;
    jobPublic: boolean;
    countryPublic: boolean;
    cityPublic: boolean;
    user: mongoose.Types.ObjectId | IUser;
}

const profileSchema = new Schema<IProfile>(
    {
        bio: { type: String, default: "", maxlength: 256 },
        image: { type: String, default: "", maxlength: 256 },
        birthdate: { type: Date, default: null },
        job: { type: String, default: "", maxlength: 64 },
        country: { type: String, default: "", maxlength: 32 },
        city: { type: String, default: "", maxlength: 32 },
        bioPublic: { type: Boolean, default: false },
        imagePublic: { type: Boolean, default: false },
        birthdatePublic: { type: Boolean, default: false },
        jobPublic: { type: Boolean, default: false },
        countryPublic: { type: Boolean, default: false },
        cityPublic: { type: Boolean, default: false },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

export const ProfileModel = mongoose.model<IProfile>("Profile", profileSchema);
