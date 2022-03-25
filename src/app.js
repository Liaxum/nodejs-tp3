import express from "express";
import path from "path";

const app = express();

app.set("views", path.resolve("views"));

app.set("view engine", "pug");

app.get("/", (_, res) => {
	if (true) {
		res.render("home");
	} else {
		res.render("login");
	}
});

app.get("/products", (_, res) => {
	res.render("products");
});

app.get("/product:{id}", (_, res) => {
    res.render("product")
});

app.get("/disconnect", (_, res) => {
	// Deconecting the user
	res.render("login");
});

app.use(express.static(path.resolve("public")));

export default app;
