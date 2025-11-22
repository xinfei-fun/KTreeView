import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  root: __dirname, // 设置根目录为 playground 目录
  plugins: [vue()],
  resolve: {
    alias: {
      ktree: path.resolve(__dirname, '../src')  // 指向源码
    }
  }
})
