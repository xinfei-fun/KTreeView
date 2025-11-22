import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',  // 库的入口文件
      name: 'KTree',       // 库的全局变量名
      fileName: 'ktree',  // 输出的文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包的依赖
      external: ['vue'],
      output: {
        // 为了支持 ES 模块和 CommonJS
        globals: {
          vue: 'Vue', // 将 Vue 作为全局变量使用
        },
      },
    },
  },
});
