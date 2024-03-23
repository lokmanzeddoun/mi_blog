const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
	sequelize.define("Category", {
		user: {
			type: DataTypes.INTEGER,
			references: {
				model: "Users",
				key: "id",
			},
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isTrimmed(value) {
					if (value !== value.trim()) {
						throw new Error(
							"Name must not have leading or trailing whitespace"
						);
					}
				},
			},
		},
	});

};
