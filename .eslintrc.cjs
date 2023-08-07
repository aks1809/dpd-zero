module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': 0,
    camelcase: 0,
    'no-prototype-builtins': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-return-await': 0,
    'no-console': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'comma-dangle': 0,
    'newline-per-chained-call': 0
  },
};
