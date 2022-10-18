module.exports = {
  extends: ['react-app', './base.js', './react.js', './react-hooks.js'],
  globals: {},
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/named': 'error',
  },
};
