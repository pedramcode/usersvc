import mongoose from "mongoose";
import config from "../config";
import logger from "../logger";
import { exit } from "process";

mongoose
    .connect(config.MONGO_URL)
    .then(() => {
        logger.info("database is connected");
    })
    .catch((err) => {
        logger.error(`cannot connect to database: ${err}`);
        exit(1);
    });
