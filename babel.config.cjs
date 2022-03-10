// Jest nekter å lese .babelrc-filer, så da får det bli babel.config.cjs
module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'babel-plugin-styled-components'
    ],
  ],
};