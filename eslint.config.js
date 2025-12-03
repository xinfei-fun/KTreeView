import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // JS 推荐
  js.configs.recommended,

  // Vue3 推荐
  ...pluginVue.configs['flat/recommended'],

  // Prettier 关闭冲突
  eslintConfigPrettier,

  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      // ◎ 关键：用 env 代替手写 globals
      env: {
        browser: true,   // window, document, fetch, console, ResizeObserver…
        node: true,      // __dirname, __filename, process, Buffer…
        es2022: true,    // globalThis, Promise, WeakRef 等新内置对象
      },

      // 只有极少数你真的需要写入 globals
      globals: {
        // 比如某些你真的手动挂载的全局变量
        __APP_VERSION__: 'readonly',
      }
    },

    rules: {
      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'warn',

      // JS
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',

      // 质量
      eqeqeq: 'warn',
      curly: 'warn',
      'no-eval': 'error',
      'no-empty-function': 'warn',
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],
    },
  },

  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      env: {
        node: true,
      },
    },
  },

  {
    ignores: ['node_modules/**', 'dist/**', '*.min.js', 'coverage/**'],
  },
];
