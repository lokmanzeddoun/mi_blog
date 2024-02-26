function applyExtraSetup(sequelize) {
	const { Post, User, Comment, Category } = sequelize.models;
	Post.hasMany(Comment, { foreignKey: "postId" });
	Post.belongsTo(User, { foreignKey: "userId" });
	User.hasMany(Post, { foreignKey: "userId" });
	Comment.belongsTo(User); // 2
	Category.belongsTo(User); //3
	// Define the association between User and Post models (Likes)
	User.belongsToMany(Post, { through: "UserLikes", foreignKey: "userId" });
	Post.belongsToMany(User, { through: "UserLikes", foreignKey: "postId" });
}

module.exports = { applyExtraSetup };
