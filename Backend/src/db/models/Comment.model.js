const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
	sequelize.define("Comment", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Posts",
				key: "id",
			},
			allowNull: false,
		},
		// userId: {
		// 	type: DataTypes.INTEGER,
		// 	references: {
		// 		model: "Users",
		// 		key: "id",
		// 	},
		// },
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
