import { defineConfig } from 'dumi';

export default defineConfig({
  base: 'x-star-design',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'x-star-design',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
