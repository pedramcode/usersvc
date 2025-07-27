import { OtpModel } from "../../infrastructure/database/models/otp.model";
import { UserModel } from "../../infrastructure/database/models/user.model";
import { NotFoundError } from "../../shared/errors";
import { IOtpCreate } from "./dao/otp.dao";

export default class OtpService {
    static async create(data: IOtpCreate) {
        const user = await UserModel.findOne({
            username: data.username,
        }).exec();
        if (!user) {
            throw new NotFoundError(`user with username ${data.username}`);
        }
        const otp = await OtpModel.create({
            user: user,
            context: data.context,
            medium: data.medium,
        });
        return otp;
    }
}
