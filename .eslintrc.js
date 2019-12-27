module.exports = {
  'extends': ['eslint:recommended', 'google'],
  'env': {
    // For more environments, see here: http://eslint.org/docs/user-guide/configuring.html#specifying-environments
    'browser': true,
    // 'es6': true,
    'node': true
  },
  "parserOptions": {
    'sourceType': 'module',
    "ecmaVersion": 8,
  },
  'rules': {
    // Frasco default rules
    // For more rules, see here: http://eslint.org/docs/rules/
    'no-var': 'off',
    'require-jsdoc': 'off',

    // Master rules
    'no-console': 'off',
    'no-unused-vars': 'off',
    'vars-on-top': 'off',
    'max-len': 'off',

    'padded-blocks': 'off',
    'comma-spacing': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'new-cap': 'off',
    'operator-linebreak': 'off',
    'indent': 'off',

    // App rules


  },
  'globals': {
    'Manager': true,
    'Configuration': true,
    'Libraries': true,
    // 'firebase': true,
    // 'Firebase': true,
    // 'lazysizes': true,
    // 'Lazysizes': true,
  },
  // 'parserOptions': {
  //   'sourceType': 'module'
  // }
}
