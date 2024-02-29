const Joi = require("joi");

// Validate Create Comment
function validateCreateComment(obj) {
	const schema = Joi.object({
		postId: Joi.string().required().label("Post ID"),
		text: Joi.string().trim().required().label("Text"),
	});
	return schema.validate(obj);
}

// Validate Update Comment
function validateUpdateComment(obj) {
	const schema = Joi.object({
		text: Joi.string().trim().required(),
	});
	return schema.validate(obj);
}

modules.export = { validateUpdateComment, validateCreateComment };
