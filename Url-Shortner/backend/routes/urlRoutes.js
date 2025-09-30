const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { validateUrl, checkValidationResult } = require('../middleware/validate');

router.post('/shorten', validateUrl, checkValidationResult, shortenUrl);
router.get('/:shortCode', redirectUrl);

module.exports = router;