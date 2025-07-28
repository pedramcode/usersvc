import express from "express";
import config from "./infrastructure/config";
import logger from "./infrastructure/logger";
import { exit } from "process";
import "./infrastructure/database";
import router from "./interfaces/http/routes";
import pingRouter from "./interfaces/http/routes/ping.route";
import errorHandlerMiddleware from "./interfaces/http/middlewares/errorHandler";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

const main = async () => {
    const app = express();

    // TODO should use external (redis) store for limiter
    const limiter = rateLimit({
        windowMs: 60 * 1000,
        limit: 50,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        ipv6Subnet: 56,
    });

    app.use(cors());
    app.use(express.json());
    app.use(limiter);
    app.use("/api", router);
    app.use("/", pingRouter);
    app.use(errorHandlerMiddleware());

    app.listen(config.HTTP_PORT, config.HTTP_HOST, (err) => {
        if (err) {
            logger.error(`cannot start http server: ${err.message}`);
            exit(1);
        }
        logger.info(
            `http server is running ${config.HTTP_HOST}:${config.HTTP_PORT}`,
        );
    });
};

main();
