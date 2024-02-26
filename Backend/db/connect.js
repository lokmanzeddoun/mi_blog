const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.USER_NAME,
	process.env.PASSWORD,
	{ host: "localhost", dialect: "mysql" }
);

const modelDefiners = [
	require("./models/Category.model"),
	require("./models/Comment.model"),
	require("./models/User.model"),
	require("./models/Post.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
