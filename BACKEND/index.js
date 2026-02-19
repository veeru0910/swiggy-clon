const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require("path");


const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes'); // fixed typo

const PORT = process.env.PORT || 5501;

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
 
})
  .then(() => console.log("MONGODB WORKING SUCCESSFULLY"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());       
app.use(express.json());
app.use(express.static(path.join(__dirname, "../FRONTEND")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND/index.html"));
});



// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server running successfully at port ${PORT}`);
});