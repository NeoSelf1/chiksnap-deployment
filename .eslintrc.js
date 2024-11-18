module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc' },
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
  },
};
