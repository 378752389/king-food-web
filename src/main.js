import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import '../mock/menu.js'

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
