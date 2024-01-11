module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowString: false,
        allowNumber: false
      }
    ]
  }
}
