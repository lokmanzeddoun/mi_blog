const { signUpUser } = require("../controllers/authControllers");

const express = require("express");
const router = express.Router();

router.post("/signUp", signUpUser);

module.exports = router;
