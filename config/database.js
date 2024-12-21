// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://petnikola97:nikolanikola1997@cluster0.zynfh.mongodb.net/DentalClinic",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;
