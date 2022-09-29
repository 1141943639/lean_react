/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 添加下面的代码,禁用 `清除浏览器默认样式`
  // (这样 `@tailwind base` 就只会添加一些默认的 tw 变量.不会去清除浏览器默认样式了.)
  corePlugins: {
    preflight: false,
  },
};
