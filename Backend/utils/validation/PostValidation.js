const Joi = require("joi");

// Validate Create Post
function validateCreatePost(obj) {
	const schema = Joi.object({
		title: Joi.string().trim().min(2).max(200).required(),
		description: Joi.string().trim().min(10).required(),
		category: Joi.string().trim().required(),
	});
	return schema.validate(obj);
}

// Validate Update Post
function validateUpdatePost(obj) {
	const schema = Joi.object({
		title: Joi.string().trim().min(2).max(200),
		description: Joi.string().trim().min(10),
		category: Joi.string().trim(),
	});
	return schema.validate(obj);
}

modules.export = { validateCreatePost, validateUpdatePost };
