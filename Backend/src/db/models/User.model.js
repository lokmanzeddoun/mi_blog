const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [2, 100],
				isTrimmed(value) {
					if (value !== value.trim())
						throw new Error(
							"Username must not have leading or tailing whitespace"
						);
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [3, 100],
				isTrimmed(value) {
					if (value !== value.trim()) {
						throw new Error(
							"The Email must not have leading or tailing whitespace"
						);
					}
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: 8,
				isTrimmed(value) {
					if (value !== value.trim()) {
						throw new Error(
							"The Email must not have leading or tailing whitespace"
						);
					}
				},
			},
		},
		profilePicture: {
			type: DataTypes.JSON,
			defaultValue: {
				url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
				publicId: null,
			},
		},
		bio: {
			type: DataTypes.STRING,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isAccountVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});
};
