import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // 新增：引入path模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {  // 新增：配置别名
    alias: {
      '@': path.resolve(__dirname, 'src')  // @指向src目录
    }
  }
})
