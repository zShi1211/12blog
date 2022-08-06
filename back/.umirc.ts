import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu:{},
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: true,
  },
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
