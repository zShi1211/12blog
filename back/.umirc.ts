import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // publicPath: "/admin/",
  base:"/admin",
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

  }
});
