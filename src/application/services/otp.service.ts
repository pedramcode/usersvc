import { OtpModel } from "../../infrastructure/database/models/otp.model";
import { UserModel } from "../../infrastructure/database/models/user.model";
import { NotFoundError } from "../../shared/errors";
import { IOtpCreate, IOtpGet } from "./dao/otp.dao";

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

    static async get(data: IOtpGet) {
        const user = await UserModel.findOne({
            username: data.username,
        }).exec();
        if (!user) {
            throw new NotFoundError(`user with username ${data.username}`);
        }
        const otp = await OtpModel.findOne({
            user,
            code: data.code,
            isUsed: false,
            medium: data.medium,
            context: data.context,
        }).exec();
        if (!otp) {
            throw new NotFoundError(`OTP`);
        }
        if (otp.isExpired) {
            throw new NotFoundError(`OTP`);
        }
        return otp;
    }
}
