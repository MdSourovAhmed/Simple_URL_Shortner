const { body, validationResult } = require("express-validator");

const validateUrl = [body("url").isURL().withMessage("Invalid URL")];

const validateAdminRegister = [
  body("email").notEmpty().withMessage("E-mail is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateAdminLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateEditUrl = [body("longUrl").isURL().withMessage("Invalid URL")];

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUrl,
  validateAdminRegister,
  validateAdminLogin,
  validateEditUrl,
  checkValidationResult,
};

// const { body, validationResult } = require('express-validator');

// const validateUrl = [
//   body('url')
//     .isURL({ require_tld: true, allow_trailing_dot: false })
//     .withMessage('Invalid URL'),
// ];

// const validateAdminLogin = [
//   body('username').notEmpty().withMessage('Username is required'),
//   body('password').notEmpty().withMessage('Password is required'),
// ];

// const validateEditUrl = [
//   body('longUrl')
//     .isURL({ require_tld: true, allow_trailing_dot: false })
//     .withMessage('Invalid URL'),
// ];

// const checkValidationResult = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// module.exports = { validateUrl, validateAdminLogin, validateEditUrl, checkValidationResult };
