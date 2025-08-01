import { NextFunction, Request, Response } from "express";
import {
    AlreadyExistsError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../../../shared/errors";
import logger from "../../../infrastructure/logger";
import config from "../../../infrastructure/config";

export default function errorHandlerMiddleware() {
    return (error: any, req: Request, res: Response, next: NextFunction) => {
        logger.debug(error.message);
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        } else if (error instanceof AlreadyExistsError) {
            return res.status(409).json({ error: error.message });
        } else if (error instanceof UnauthorizedError) {
            return res.status(401).json({ error: error.message });
        } else if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }

        if (config.RUNTIME == "dev") {
            return res.status(500).json({ error: `${error}` });
        }
        return res.status(500).json({ error: "internal server error" });
    };
}
