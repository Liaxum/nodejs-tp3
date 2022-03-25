import express from "express";
import { hasValidToken, signin } from "../authentification.js";

const router = express.Router();

router.get("/", hasValidToken, (_, res) => {
	res.render("home");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/api/login", (req, res) => {
	const { email, password } = req.body;

	if (email === "user@example.com" && password === "password") {
		const token = signin(email);
		res.json({ token });
	} else {
		res.status(401).json({ message: "Invalid email or password" });
	}
});

router.get("/products", hasValidToken, (_, res) => {
	res.render("products");
});

router.get("/product:{id}", hasValidToken, (_, res) => {
	res.render("product");
});

router.get("/disconnect", hasValidToken, (_, res) => {
	// Deconecting the user
	res.render("login");
});

export default router;
