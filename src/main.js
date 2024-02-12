import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "./utils/http.js";
import "./static/iconfont/iconfont.css";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(persist);
  app.use(pinia);
  return {
    app,
  };
}
