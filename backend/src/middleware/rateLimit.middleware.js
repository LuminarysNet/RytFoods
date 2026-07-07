const rateLimit = require('express-rate-limit');

exports.generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests from this IP, please try again later',
});

exports.authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many auth attempts, please try again later',
});

exports.paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many payment attempts, please try again later',
});
