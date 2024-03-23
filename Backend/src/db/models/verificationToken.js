const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("verificationToken", {
	
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
