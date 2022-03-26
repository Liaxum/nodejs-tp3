import Sequelize from "sequelize";

const db = new Sequelize({
	dialect: "sqlite",
	storage: "./data/database.sqlite",
});

db.authenticate()
	.then(() => {
		console.log("Connection established!");
	})
	.catch((e) => {
		console.log(`Unable to connect to database: ${e}`);
	});

db.sync({force: true});
export default db;
