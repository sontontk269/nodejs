"use strict";
//làm việc với signup signin ,....
const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

//sigUP
router.post('/shop/signup', accessController.signUp)

module.exports = router;
