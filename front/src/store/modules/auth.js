import axios from "axios";

const state = {
	token: null,
	posts: null,
};

const getters = {
	isAuthenticated: (state) => !!state.token,
	StatePosts: (state) => state.posts,
	StateToken: (state) => state.token,
};

const actions = {
	async Register({ dispatch }, form) {
		await axios.post("register", form);
		let UserForm = new FormData();
		UserForm.append("username", form.username);
		UserForm.append("password", form.password);
		await dispatch("LogIn", UserForm);
	},

	async LogIn({ commit }, user) {
		const res = await axios.post("login", user);
		await commit("setToken", res.data.token);
	},

	async CreatePost({ dispatch }, { post, token }) {
		await axios.post("post", post, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return await dispatch("GetPosts", token);
	},

	async GetPosts({ commit }, token) {
		const response = await axios.get("posts", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		commit("setPosts", response.data);
	},

	async LogOut({ commit }) {
		let token = null;
		commit("logout", token);
	},
};

const mutations = {
	setToken(state, token) {
		state.token = token;
	},

	setPosts(state, posts) {
		state.posts = posts;
	},
	logout(state, token) {
		state.token = token;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
