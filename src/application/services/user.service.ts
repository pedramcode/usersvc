import config from "../../infrastructure/config";
import {
    IUser,
    UserModel,
} from "../../infrastructure/database/models/user.model";
import logger from "../../infrastructure/logger";
import {
    AlreadyExistsError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    UnreachableError,
} from "../../shared/errors";
import { IUserCredentials, IUserLogin, IUserRegister } from "./dao/user.dao";
import OtpService from "./otp.service";
import jwt, { JwtPayload } from "jsonwebtoken";

const _generateAccessToken = (user: IUser) => {
    const accessKey = jwt.sign(
        { super: user.isSuperuser, email: user.email, typ: "access" },
        config.SECRET,
        {
            subject: user.username,
            expiresIn: "15Min",
            issuer: "user-service",
        },
    );
    return accessKey;
};

const _generateRefreshToken = (user: IUser) => {
    const accessKey = jwt.sign(
        { super: user.isSuperuser, email: user.email, typ: "refresh" },
        config.SECRET,
        {
            subject: user.username,
            expiresIn: "3Week",
            issuer: "user-service",
        },
    );
    return accessKey;
};

export default class UserService {
    static async refreshCredentials(
        refreshToken: string,
    ): Promise<IUserCredentials> {
        try {
            jwt.verify(refreshToken, config.SECRET);
            const data = jwt.decode(refreshToken);
            if (!data) {
                throw new BadRequestError();
            }
            const payload = data as JwtPayload;
            if (!payload["typ"] || payload["typ"] != "refresh") {
                throw new BadRequestError();
            }

            const username = payload["sub"];
            const user = await UserModel.findOne({
                username: username,
            });
            if (!user) {
                throw new BadRequestError();
            }
            const accessKey = _generateAccessToken(user);
            return { accessKey };
        } catch (e) {
            throw new BadRequestError("invalid refresh token");
        }
    }

    static async login(data: IUserLogin): Promise<IUserCredentials> {
        const user = await UserModel.findOne({
            username: data.username,
            passwordHash: data.password,
        });
        if (!user) {
            throw new UnauthorizedError();
        }
        const accessKey = _generateAccessToken(user);
        const refreshKey = _generateRefreshToken(user);
        return { accessKey, refreshKey };
    }

    static async register(data: IUserRegister): Promise<string> {
        switch (data.step) {
            case "1": {
                // Find user by username or email
                let user = await UserModel.findOne({
                    $or: [{ username: data.username }, { email: data.email }],
                }).exec();

                if (user) {
                    if (user.isEmailVerified) {
                        throw new AlreadyExistsError(
                            `user with username "${data.username}" or email "${data.email}"`,
                        );
                    }
                    // Update user info if not verified
                    user.passwordHash = data.password;
                    user.firstname = data.firstname;
                    user.lastname = data.lastname;
                    user.email = data.email;
                    await user.save();
                } else {
                    // Create new user
                    user = await UserModel.create({
                        username: data.username,
                        passwordHash: data.password,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                    });
                }

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
                if (!data.otp) {
                    throw new BadRequestError(`OTP code is required`);
                }
                const otp = await OtpService.get({
                    code: data.otp,
                    context: "REGISTER",
                    medium: "EMAIL",
                    username: data.username,
                });
                otp.isUsed = true;
                await otp.save();

                const user = await UserModel.findOne({
                    username: data.username,
                }).exec();
                if (!user) {
                    throw new NotFoundError(
                        `user with username ${data.username}`,
                    );
                }
                if (user.isEmailVerified) {
                    throw new BadRequestError(`user is alrady active`);
                }
                user.isEmailVerified = true;
                await user.save();
                return "registration done";
            }
            default: {
                throw new UnreachableError();
            }
        }
    }
}
