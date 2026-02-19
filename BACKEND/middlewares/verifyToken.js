const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET;

const verifyToken = async (req, res, next) => {
  // Expecting header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // FIX: match payload key from login (vendorId)
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(401).json({ error: "Vendor not found" });
    }

    // Attach vendorId to request for later use
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;