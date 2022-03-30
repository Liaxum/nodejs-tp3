import express from "express";
import path from "path";
import cors from "cors";
import router from "./routes/router.js";

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(express.static(path.resolve("public")));

export default app;
