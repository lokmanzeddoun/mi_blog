const Joi = require("joi");

// Validate Create Category
function validateCreateCategory(obj) {
	const schema = Joi.object({
		title: Joi.string().trim().required().label("Title"),
	});
	return schema.validate(obj);
}

modules.export = validateCreateCategory;
