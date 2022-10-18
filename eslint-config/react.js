module.exports = {
  rules: {
    'react/jsx-curly-brace-presence': ['off', 'never'],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-undef': 'error',
    'react/no-deprecated': 'error',
    'react/require-render-return': 'error',
    'react/no-unknown-property': 'error',
    'react/self-closing-comp': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/sort-comp': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react/no-this-in-sfc': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
  },
};
