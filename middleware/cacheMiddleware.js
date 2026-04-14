const { redisClient } = require('../config/redis');

const cacheMiddleware = (key, ttl = 60) => {
  return async (req, res, next) => {
    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.status(200).json({
          success: true,
          message: 'Data fetched successfully (from cache)',
          data: JSON.parse(cachedData)
        });
      }

      res.sendResponse = res.json;
      res.json = async (body) => {
        if (body.success && body.data) {
          await redisClient.setEx(key, ttl, JSON.stringify(body.data));
        }

        return res.sendResponse(body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

module.exports = cacheMiddleware;