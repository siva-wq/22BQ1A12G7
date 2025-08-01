const express = require('express');
const router = express.Router();
const { createShortUrl, getOriginalUrl, getAnalytics } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/:shortCode', getOriginalUrl);
router.get('/:shortCode/analytics', getAnalytics);

module.exports = router;