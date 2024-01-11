module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json']
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowString: false,
        allowNumber: false
      }
    ]
  }
}
