import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

export const uploadQueue = new Queue("uploadQueue", {
  connection,
});