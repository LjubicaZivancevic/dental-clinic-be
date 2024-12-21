// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./src/models/User"); // Dodaj import za User model

dotenv.config(); // Load env variables

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Database Connection
connectDB()
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});

// Test route
app.get("/", (req, res) => {
	res.send("API is running...");
});

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

// POST ruta za kreiranje korisnika
app.post("/api/users", async (req, res) => {
	const { name, email, password, role } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ error: "Name, email, and password are required" });
	}

	try {
		// Proveri da li korisnik već postoji
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Kreiraj novog korisnika
		const newUser = new User({
			name,
			email,
			password,
			role,
		});

		// Spasi korisnika u bazu
		await newUser.save();

		res
			.status(201)
			.json({ message: "User created successfully", user: newUser });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
