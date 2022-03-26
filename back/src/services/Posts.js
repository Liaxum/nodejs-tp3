import db from "./db.js";

const Posts = db.define("posts", {
	title: {
		type: String,
		allowNull: false,
	},
	text: {
		type: String,
		allowNull: false,
	},
});


export default Posts;