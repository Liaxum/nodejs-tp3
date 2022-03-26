import express from "express";
import { hasValidToken, signin } from "../authentification.js";
import multer from "multer";
import Users from "../services/Users.js";
import Posts from "../services/Posts.js";

const router = express.Router();

router.post("/login", multer().none(), async (req, res) => {
	const { username, password } = req.body;
	const user = await Users.findOne({ where: { username: username } });
	if (user && user.password === password) {
		const token = signin(username);
		res.json({ token });
	} else {
		res.status(401).json({ message: "Invalid email or password" });
	}
});

router.post("/register", multer().none(), (req, res) => {
	const { username, full_name, password } = req.body;

	Users.create({
		username: username,
		full_name: full_name,
		password: password,
	})
		.then(() => {
			const token = signin({ username });
			res.json({ token });
		})
		.catch(() => {
			res.status(400).json({
				message: "Error register user",
			});
		});
});

router.get("/posts", hasValidToken, async (_, res) => {
	const posts = await Posts.findAll();
	res.json(posts);
});

router.post("/post", hasValidToken, (req, res) => {
	const { text, title } = req.body;
	Posts.create({ title, text }).
	then(() => {
		res.send(200);
	})
	.catch((e) => {
		res.send(400).json({ message: "Error creating post" });
	});
});

router.get("/disconnect", hasValidToken, (_, res) => {
	// Deconecting the user
	res.render("login");
});

export default router;
