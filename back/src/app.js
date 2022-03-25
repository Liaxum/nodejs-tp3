import express from "express";
import path from "path";
import router from './routes/router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(express.static(path.resolve("public")));

export default app;
