const Joi = required("joi");
const passwordComplexity = require("joi-password-complexity");

// Validate Update User
function validateUpdateUser(obj) {
	const schema = Joi.object({
		username: Joi.string().trim().min(2).max(100),
		password: passwordComplexity(),
		bio: Joi.string(),
	});
	return schema.validate(obj);
}

// Validate Email
function validateEmail(obj) {
	const schema = Joi.object({
		email: Joi.string().trim().min(5).max(100).required().email(),
	});
	return schema.validate(obj);
}

// Validate New Password
function validateNewPassword(obj) {
	const schema = Joi.object({
		password: passwordComplexity().required(),
	});
	return schema.validate(obj);
}

modules.export = { validateEmail, validateNewPassword, validateUpdateUser };
