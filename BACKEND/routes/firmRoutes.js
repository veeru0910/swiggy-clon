const express=require('express');


const router=express.Router()
const verifyToken=require('../middlewares/verifyToken');
const firmcontrollers = require('../controllers/firmcontrollers');
router.post('/add-firm',verifyToken,firmcontrollers.addFirm);
module.exports=router;
