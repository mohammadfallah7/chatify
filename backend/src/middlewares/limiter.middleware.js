import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({
      message: "Too many authentication attempts, please try again later.",
    });
  },
});

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (req.user?._id) {
      /* toString is too important */
      return req.user._id.toString();
    }

    return ipKeyGenerator(req);
  },
  handler: (_, res) => {
    res.status(429).json({
      message: "Too many requests from this account, please try again later.",
    });
  },
});

export { authLimiter, userLimiter };
