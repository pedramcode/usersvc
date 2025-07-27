import express from "express";
import config from "./infrastructure/config";
import logger from "./infrastructure/logger";
import { exit } from "process";
import "./infrastructure/database";
import router from "./interfaces/http/routes";
import pingRouter from "./interfaces/http/routes/ping.route";

const main = async () => {
    const app = express();

    app.use("/api", router);
    app.use("/", pingRouter);

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
