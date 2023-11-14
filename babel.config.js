module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['inline-import-data-uri', { extensions: ['.svg', '.png', '.jpg'] }],
  ],
};
