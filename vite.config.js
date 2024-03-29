import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni(),
	],
	server: {
		port: 8322,
		proxy: {
			"/api": {
				target: "http://localhost:8081",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	// 全局引入css处理
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/styles/global.scss";'
			}
		}
	}
})