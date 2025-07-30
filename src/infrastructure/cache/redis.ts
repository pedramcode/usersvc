import * as redis from "redis";
import config from "../config";
import logger from "../logger";
import { exit } from "process";

let redisClient = redis.createClient({
    url: config.REDIS_URL,
    database: 2,
});

export const connectRedis = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await redisClient.connect();
            logger.info("redis is connected");
            resolve();
        } catch (e) {
            logger.error(`connot connect to redis server: ${e}`);
            exit(1);
        }
    });
};

export default redisClient;
