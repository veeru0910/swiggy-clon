const Vendor = require('../models/Vendor'); // consistent name everywhere
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET;

// Vendor Registration
const VendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if username already exists
    const existingUsername = await Vendor.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Check if email already exists
    const existingEmail = await Vendor.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new vendor
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword
    });

    await newVendor.save();
    return res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    console.error("Vendor registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Vendor Login
const VendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Use "vendorId" consistently in payload
    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });

    return res.status(200).json({ success: "Login successful!", token });
  } catch (error) {
    console.error("Vendor login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { VendorRegister, VendorLogin };