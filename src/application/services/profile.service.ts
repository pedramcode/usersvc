import { ProfileModel } from "../../infrastructure/database/models/profile.model";
import {
    IUser,
    UserModel,
} from "../../infrastructure/database/models/user.model";
import { AlreadyExistsError, NotFoundError } from "../../shared/errors";
import { IProfileUpdate } from "./dao/profile.dao";

export default class ProfileService {
    static async createEmptyForUser(user: IUser) {
        const profileExists = await ProfileModel.find({ user })
            .countDocuments()
            .exec();
        if (profileExists != 0) {
            throw new AlreadyExistsError(`profile for ${user.username}`);
        }
        const profile = await ProfileModel.create({ user });
        return profile;
    }

    static async get(username: string, secure: boolean) {
        const user = await UserModel.findOne({ username }).exec();
        if (!user) {
            throw new NotFoundError(`account ${username}`);
        }
        let profile = await ProfileModel.findOne({ user })
            .select("-_id")
            .exec();
        if (!profile) {
            throw new NotFoundError(`account "${username}"`);
        }
        if (secure) {
            profile.bio = profile.bioPublic ? profile.bio : "";
            profile.image = profile.imagePublic ? profile.image : "";
            profile.birthdate = profile.birthdatePublic
                ? profile.birthdate
                : null!;
            profile.job = profile.jobPublic ? profile.job : "";
            profile.country = profile.countryPublic ? profile.country : "";
            profile.city = profile.cityPublic ? profile.city : "";
        }
        return profile;
    }

    static async update(username: string, data: IProfileUpdate) {
        const user = await UserModel.findOne({ username }).exec();
        if (!user) {
            throw new NotFoundError(`account ${username}`);
        }
        const profileExists = await ProfileModel.find({ user })
            .countDocuments()
            .exec();
        if (profileExists == 0) {
            throw new NotFoundError(`account "${username}"`);
        }
        const profileUpdated = await ProfileModel.findOneAndUpdate(
            { user },
            { ...data },
            { new: true },
        ).select("-_id");
        return profileUpdated;
    }
}
