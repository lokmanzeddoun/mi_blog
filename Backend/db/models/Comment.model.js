const { DataTypes } = require("sequelize");
const Joi = require("joi");

module.exports = (sequelize) => {
	sequelize.define("Comment", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Post",
				key: "id",
			},
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: "User",
				key: "id",
			},
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
