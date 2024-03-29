const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { models } = require("../db/connect");
const sendEmail = require("../utils/sendEmail");
const ApiError = require("../utils/apiError");
const {
	signInValidation,
	signUpValidation,
} = require("../utils/validation/AuthValidation");
const { where } = require("sequelize");

/*
@desc Sign up new user
@route /api/auth/signUp
@method POST
@access public
*/
exports.signUpUser = asyncHandler(async (req, res, next) => {
	const { error } = signUpValidation(req.body);
	if (error) {
		return next(new ApiError(`Validation Error , ${error}`, 400));
	}
	let user = await models.User.findOne({ where: { email: req.body.email } });
	if (!(user === null)) {
		return next(
			new ApiError(`This ${req.body.email} Email Already in used`, 400)
		);
	}
	const salt = await bcrypt.genSalt(11);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	try {
		user = new models.User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		await user.save();
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError")
			return next(new ApiError(`The name have been used before`, 400));
	}

	const verificationToken = new models.verificationToken({
		userId: user._id,
		token: crypto.randomBytes(32).toString("hex"),
	});
	await verificationToken.save();

	// Making the link
	const link = `${process.env.CLIENT_DOMAIN}`
		// / users / ${ user._id }/verify/${ verificationToken.title }`;
	// {verificationToken.token}`;

	// Putting the link into an html template
	const htmlTemplate = `
    <div>
      <p>Click on the link below to verify your email</p>
      <a href="${link}">Verify</a>
    </div>`;

	// Sending email to the user
	await sendEmail({
		email: user.email,
		subject: "Verify Your Email",
		message: htmlTemplate,
	});

	// Response to the client
	res.status(201).json({
		message: "We sent to you an email, please verify your email address",
	});
});
