import db from "./db.js";

const Users = db.define("User", {
	username: {
		type: String,
		allowNull: false,
	},
	full_name: {
		type: String,
		allowNull: false,
	},
	password: {
		type: String,
		allowNull: false,
	},
});


export default Users;