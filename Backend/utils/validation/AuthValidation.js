const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

function signUpValidation(obj) {
	const schema = Joi.object({
		username: Joi.string().alphanum().trim().min(2).max(100).required(),
		email: Joi.string().trim().min(5).max(100).required().email(),
		password: passwordComplexity().required(),
	});
	return schema.validate(obj);
}

function signInValidation(obj) {
	const schema = Joi.object({
		email: Joi.string().trim().min(5).max(100).required().email(),
		password: passwordComplexity().required(),
	});
	return schema.validate(obj);
}

modules.export = { signInValidation, signUpValidation };