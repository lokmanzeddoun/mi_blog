const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../db/models/User.model");
const sendEmail = require("../utils/sendEmail")
const ApiError = require("../utils/apiError");
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
		return next(new ApiError(`Validation Error , ${error}`, 400));
	}
	const user = User.findOne({ email: req.body.email });
	if (!user) {
		return next(
			new ApiError(`This ${req.body.email} Email Already in used`, 400)
		);
	}
	const salt = await bcrypt.genSalt(11);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});
	await user.save();
	// create new verification Token
	// Creating new VerificationToken & save it toDB
const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  // Making the link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  // Putting the link into an html template
  const htmlTemplate = `
    <div>
      <p>Click on the link below to verify your email</p>
      <a href="${link}">Verify</a>
    </div>`;

  // Sending email to the user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // Response to the client
  res.status(201).json({
    message: "We sent to you an email, please verify your email address",
  });
});
