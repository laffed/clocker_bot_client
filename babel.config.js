module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@state': './src/state',
          '@core': './src/core',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation'
        },
      },
    ],
  ],
};
