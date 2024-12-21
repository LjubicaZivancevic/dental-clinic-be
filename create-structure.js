const fs = require("fs");
const path = require("path");

// Osnovna struktura projekta
const structure = [
	"src",
	"src/routes",
	"src/controllers",
	"src/models",
	"src/utils",
	"config",
	"public",
	"tests",
	".env",
	"README.md",
	"package.json",
	"server.js",
];

// Kreiraj fajlove i foldere
structure.forEach((item) => {
	const itemPath = path.join(__dirname, item);
	if (path.extname(item)) {
		// Ako je fajl, kreiraj ga
		fs.writeFileSync(itemPath, "");
	} else {
		// Ako je folder, kreiraj ga
		fs.mkdirSync(itemPath, { recursive: true });
	}
});

console.log("Project structure created successfully!");
