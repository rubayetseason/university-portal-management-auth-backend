/* eslint-disable no-unused-vars */
import { SetOptions, createClient } from 'redis';
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

//set data in redis
const set = async (key: string, value: string, options?: SetOptions) => {
  await redisClient.set(key, value, options);
};

//get data from redis
const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

//delete data from redis
const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

//set access token in redis
const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.set(key, token, {
    EX: Number(config.redis.redis_expires_in),
  });
};

//get access token from redis
const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;
  return await redisClient.get(key);
};

//delete access token from redis
const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.del(key);
};

//disconnect redis if necessary
const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPublishClient.quit();
  await redisSubscribeClient.quit();
};

export const RedisClient = {
  connect,
  publish: redisPublishClient.publish.bind(redisPublishClient),
  subscribe: redisSubscribeClient.subscribe.bind(redisSubscribeClient),
  set,
  get,
  del,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  disconnect,
};
