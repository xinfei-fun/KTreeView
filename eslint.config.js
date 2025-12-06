import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals'; // 引入 globals 库

export default [
  // 1. JS 推荐配置
  js.configs.recommended,

  // 2. Vue3 推荐配置 (注意：flat/recommended 已经是一个数组，且包含了自己的 parser 设置)
  ...pluginVue.configs['flat/recommended'],

  // 3. Prettier 关闭冲突配置 (建议放在规则集后面)
  eslintConfigPrettier,

  // 4. 自定义配置
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      // 关键修改点：用 globals 对象代替 env
      globals: {
        ...globals.browser, // 对应 env: { browser: true }
        ...globals.node,    // 对应 env: { node: true }
        ...globals.es2021,  // 对应 env: { es2021: true } (处理 Promise, WeakRef 等)
        
        // 自定义全局变量
        __APP_VERSION__: 'readonly',
      },
    },

    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'warn',

      // JS 规则
      'no-unused-vars': 'warn',
      'no-undef': 'error',     
      'prefer-const': 'warn',
      'no-var': 'error',

      // 代码质量
      eqeqeq: 'warn',
      curly: 'warn',
      'no-val': 'off', // 注意：JS中没有 no-val 规则，可能是你想写 'no-eval' 或 'no-var'？这里删掉了不存在的规则
      'no-eval': 'error',
      'no-empty-function': 'warn'      
    },
  },

  // 5. 针对 CJS 文件的特殊处理
  {
    files: ['**/*.cjs'], // 或者旧配置文件的特定名称
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      }
    },
  },

  // 6. 全局忽略 (ignores 放在独立对象中作为全局忽略)
  {
    ignores: ['node_modules/', 'dist/', '*.min.js', 'coverage/'],
  },
];