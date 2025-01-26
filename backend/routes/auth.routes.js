const express = require("express");

const {login, signUp} = require("../controllers/auth.controller")

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;