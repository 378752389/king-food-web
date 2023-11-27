import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import './styles/web.less';

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
