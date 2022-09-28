import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  base: process.env.NODE_ENV === 'production' ? "/admin" : '/',
  mfsu: {},
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: true,
  },
  outputPath: "../dist/public/admin",
  proxy: {
    '/upload': {
      'target': 'http://localhost:1111',
    },
    '/api': {
      'target': 'http://localhost:1111',
      'changeOrigin': true,
    },
  },
  title: 'zshishi2',
});
