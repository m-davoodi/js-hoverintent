const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/preset-flow',
      {
        targets: {
          browsers: ['ie >= 11'],
          node: 6
        },
        modules: false,
        loose: true
      }
    ]
  ],
}