import config from "../../infrastructure/config";
import { UserModel } from "../../infrastructure/database/models/user.model";
import logger from "../../infrastructure/logger";
import { AlreadyExistsError, UnreachableError } from "../../shared/errors";
import { IUserRegister } from "./dao/user.dao";
import OtpService from "./otp.service";

export default class UserService {
    static async register(data: IUserRegister): Promise<string> {
        switch (data.step) {
            case "1": {
                const count = await UserModel.find({
                    username: data.username,
                    email: data.email,
                })
                    .countDocuments()
                    .exec();
                if (count != 0) {
                    throw new AlreadyExistsError(
                        `user with username ${data.username} or email ${data.email}`,
                    );
                }
                const user = await UserModel.create({
                    username: data.username,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                });
                const otp = await OtpService.create({
                    context: "REGISTER",
                    medium: "EMAIL",
                    username: user.username,
                });
                // TODO send email here
                if (config.RUNTIME == "dev") {
                    logger.debug(`generated OTP : ${otp.code}`);
                }
                return "otp has been sent to your inbox";
            }
            case "2": {
                return "";
            }
            default: {
                throw new UnreachableError();
            }
        }
    }
}
