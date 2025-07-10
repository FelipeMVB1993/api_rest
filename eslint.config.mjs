// // eslint.config.mjs
// import js from '@eslint/js';

// export default [
//   js.configs.recommended,
//   {
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       globals: {
//         console: 'readonly',
//       },
//     },
//     rules: {
//       // ⚠️ Regras de formatação manuais (precisa ativar uma por uma)
//       'semi': ['error', 'always'],
//       'quotes': ['error', 'single'],
//       'indent': ['error', 2],
//       'no-multiple-empty-lines': ['error', { max: 1 }],
//       'no-trailing-spaces': ['error'],
//       'space-before-blocks': ['error', 'always'],
//       'space-infix-ops': ['error'],
//       'keyword-spacing': ['error', { before: true, after: true }],
//       'comma-spacing': ['error', { before: false, after: true }],
//       'no-extra-semi': 'error',

//       // Boas práticas
//       'no-unused-vars': 'warn',
//       'no-undef': 'error',
//     },
//   },
// ];

import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly', // necessário para evitar o erro "process is not defined"
        __dirname: 'readonly', // se você estiver usando __dirname
        module: 'readonly',
        require: 'readonly', // caso use require em alguns arquivos
      },
    },
    rules: {
      // Estilo e formatação
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': ['error'],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': ['error'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'no-extra-semi': 'error',

      // Boas práticas
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];

