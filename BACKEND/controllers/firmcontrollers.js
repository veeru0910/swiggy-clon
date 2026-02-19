const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor'); // consistent name

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmname, area, categories, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    // Match middleware property
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmname,
      area,
      categories,
      region,
      offer,
      image,
      vendor: vendor._id
    });

    await firm.save();

    
    vendor.firms.push(firm._id);
    await vendor.save();

    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addFirm: [upload.single('image'), addFirm] };