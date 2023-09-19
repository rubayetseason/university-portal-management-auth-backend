/* eslint-disable no-unused-vars */
import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPublishClient = createClient({
  url: config.redis.url,
});

const redisSubscribeClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', err => console.log('RedisError', err));
redisClient.on('connect', connect => console.log('Redis connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPublishClient.connect();
  await redisSubscribeClient.connect();
};

export const RedisClient = {
  connect,
  publish: redisPublishClient.publish.bind(redisPublishClient),
  subscribe: redisSubscribeClient.subscribe.bind(redisSubscribeClient),
};
