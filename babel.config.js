module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@user': './src/modules/user',
          '@room': './src/modules/room',
          '@constants': './src/constants',
          '@config': './src/config',
          '@database': './src/database',
          '@libs': './src/libs'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
