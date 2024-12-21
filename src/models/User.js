// models/User.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["manager", "doctor", "patient"],
			default: "patient",
		},
	},
	{
		timestamps: true,
		collection: "Users",
	}
);

module.exports = mongoose.model("User", userSchema, "Users");
