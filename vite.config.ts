import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const fs = require("fs")
const dotenv = require("dotenv")
const { resolve } = require('path') // 编辑器提示 path 模块找不到，可以yarn add @types/node --dev

export default ({ command, mode }) => {
	let NODE_ENV =  process.env.NODE_ENV || 'development';
  let envFiles = [];
	//根据不同的环境使用不同的环境变量
	if(command == 'serve'){
		envFiles = [
			/** default file */
			`.env`
		]
	}else{
		envFiles = [
			/** default file */
			`.env`,
			/** mode file */
			`.env.${NODE_ENV}`
		]
	}
	for (const file of envFiles) {
		const envConfig = dotenv.parse(fs.readFileSync(file))
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
	}
	return defineConfig({
		plugins: [vue()],
		resolve: {
		    alias: {
		      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
		    }
		},
		server: {
			// host: 'http://localhost',
			port: process.env.VITE_PORT,
			// 是否自动在浏览器打开
			open: true,
			// 是否开启 https
			https: false,
			// 服务端渲染
			ssr: false,
			strictPort:false, //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
			base: process.env.VITE_BASE_URL,
			outDir: process.env.VITE_OUTPUT_DIR,//默认： dist  指定输出路径（相对于项目根目录)。
			brotliSize:false, //默认： true 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
			proxy: {
				// 字符串简写写法
				'/foo': 'http://localhost:4567/foo',
				'/users': 'http://localhost:3000/users',
				// 选项写法
				'/api':{
				target:'http://localhost:3000/',
				changeOrigin:true,
				rewrite:(path) => path.replace(/^\/api/,'')
				},
				// 正则表达式写法
				'^/fallback/.*': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/fallback/, '')
				},
			}
		},
	})
}
