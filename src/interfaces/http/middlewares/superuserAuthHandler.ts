import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../infrastructure/config";

export default function superuserAuthMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers["authorization"]) {
            throw new UnauthorizedError();
        }
        let token = req.headers["authorization"];
        if (!token) {
            throw new UnauthorizedError();
        }

        try {
            token = token as string;
            token = token.replace("bearer ", "");
            token = token.replace("BEARER ", "");
            token = token.replace("Bearer ", "");
            jwt.verify(token, config.SECRET);
            const data = jwt.decode(token);
            if (!data) {
                throw new UnauthorizedError();
            }
            const payload = data as JwtPayload;
            if (
                !payload["typ"] ||
                payload["typ"] != "access" ||
                !payload["super"]
            ) {
                throw new UnauthorizedError();
            }
            next();
        } catch (err) {
            throw new UnauthorizedError();
        }
    };
}
