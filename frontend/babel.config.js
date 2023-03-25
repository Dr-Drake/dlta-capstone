module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        '@': './src'
      }
    }]
  ]
};