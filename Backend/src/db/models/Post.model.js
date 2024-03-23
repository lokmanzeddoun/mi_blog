const { DataTypes } = require("sequelize");
// We export the function that define the model
// This function will automatically receive the Sequelize connection object

module.exports =  (sequelize) => {
	sequelize.define("Post", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 200],
				isTrimmed(value) {
					if (value !== value.trim()) {
						throw new Error(
							"Name must not have leading or trailing whitespace"
						);
					}
				},
			},
		},
		description: {
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
				min: 10,
			},
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				// This is reference to another model
				model: "Users",
				key: "id",
			},
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: {
				url: "",
				publicId: null,
			},
		},
		likes: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: [],
		},
	});
};

// Defining the Association
// Post.hasMany(Comment, { foreignKey: "postId" });
// Post.belongsToMany(User, { through: "PostLikes", as: "likedBy" });
