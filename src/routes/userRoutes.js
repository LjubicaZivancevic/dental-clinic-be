// routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Importuj User model
const User = require("../models/User");

// GET ruta za sve korisnike
router.get("/", async (req, res) => {
	try {
		console.log("Fetching users..."); // Dodaj log
		const users = await User.find();
		console.log("Users found:", users); // Dodaj log da vidiš rezultate
		if (!users || users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}
		res.status(200).json(users); // Vraća korisnike
	} catch (error) {
		console.error("Error fetching users:", error); // Log greške
		res.status(500).json({ message: "Server error", error });
	}
});
// GET ruta za korisnika prema email-u
router.get("/:email", async (req, res) => {
	const { email } = req.params;
	console.log("Users found:", email);
	try {
		const user = await User.findOne({ email });
		if (user) {
			console.log("Users found:", user);
			res.status(200).json(user);
		} else {
			console.log("Users not found:", user);
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
});
router.post("/", async (req, res) => {
	const { name, email, password, role } = req.body;
	console.log("Users:", name, email, password, role);
	// Proveri da li su svi podaci prisutni
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
			password, // Lozinka treba biti hashovana, ovo je samo primer
			role,
		});

		// Spasi korisnika u bazu
		await newUser.save();
		console.error("creating user:", newUser);
		// Vraćanje uspešnog odgovora
		res
			.status(201)
			.json({ message: "User created successfully", user: newUser });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Ostale rute za dohvatanje korisnika, itd.
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
});

module.exports = router;
