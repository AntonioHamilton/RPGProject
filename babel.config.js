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
          '@constants': './src/constants',
          '@config/*': './src/config/*',
          '@database/*': './src/database/*'

        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
