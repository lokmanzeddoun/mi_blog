const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../db/models/User.model");
const {
	signInValidation,
	signUpValidation,
} = require("../utils/validation/AuthValidation");

/*
@desc Sign up new user
@route /api/auth/signUp
@method POST
@access public
*/
module.exports.signUpUser = asyncHandler(async (req, res, next) => {
	const { error } = signUpValidation(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
  }
  
});
