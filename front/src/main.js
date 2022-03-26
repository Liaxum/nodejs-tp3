import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import VueColumnsResizableVuetify from "vue-columns-resizable-vuetify";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use(undefined, function (error) {
	if (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			store.dispatch("LogOut");
			return router.push("/login");
		}
	}
});

Vue.use(VueColumnsResizableVuetify);
Vue.config.productionTip = false;

new Vue({
	store,
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
