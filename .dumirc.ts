import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'x-star-design',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
