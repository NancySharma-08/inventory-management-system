const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});

redisClient.on('error', (err) => {
  console.error('Redis Error:', err.message);
});

redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

module.exports = {
  redisClient,
  connectRedis
};