module.exports = {
  extends: ['./eslint-config'],
  ignorePatterns: ['*.d.ts'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
