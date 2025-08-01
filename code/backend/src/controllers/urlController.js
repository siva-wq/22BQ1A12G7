const Url = require('../models/urlModel');
const crypto = require('crypto');


const generateShortCode = async () => {
  let code;
  do {
    code = crypto.randomBytes(3).toString('hex');
  } while (await Url.findOne({ shortCode: code }));
  return code;
};


exports.createShortUrl = async (req, res) => {
  const { originalUrl, customCode, expiryMinutes } = req.body;
  try {
    let shortCode = customCode || await generateShortCode();

    if (customCode) {
      const existing = await Url.findOne({ shortCode: customCode });
      if (existing) return res.status(400).json({ message: 'Custom code already exists' });
    }

    const expiresAt = expiryMinutes ? new Date(Date.now() + expiryMinutes * 60000) : null;

    const newUrl = new Url({ originalUrl, shortCode, expiresAt });
    await newUrl.save();

    res.json({ shortUrl: `${req.headers.host}/${shortCode}`, shortCode, expiresAt });
  } catch (error) {
    res.status(500).json({ message: 'Error creating short URL', error });
  }
};

exports.getOriginalUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode.trim();
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    if (urlDoc.expiresAt && new Date() > urlDoc.expiresAt) {
      return res.status(410).json({ message: 'Short URL has expired' });
    }

    urlDoc.clicks;
    urlDoc.clickDetails.push({
      timestamp: new Date(),
      source: req.headers['user-agent'],
      location: 'unknown',
    });

    await urlDoc.save();

    // Ensure valid protocol
    let originalUrl = urlDoc.originalUrl.trim();
    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = 'https://' + originalUrl;
    }


    return res.status(200).json({ originalUrl });

  } catch (err) {
    console.error('Error in getOriginalUrl:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getshortcode=async(req,res)=>{
  const {link}=req.params;
  const shortcode=await Url.findOne({link});
  if(!shortcode) return res.status(400).json({message:"URL not found"})

    res.json({shortcode:shortcode.shortCode});
}

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;
  const urlDoc = await Url.findOne({ shortCode });
  if (!urlDoc) return res.status(404).json({ message: 'URL not found' });

  res.json({
    clicks: urlDoc.clicks,
    clickDetails: urlDoc.clickDetails,
  });
};