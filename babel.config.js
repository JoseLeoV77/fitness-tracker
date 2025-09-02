module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "nativewind/babel",
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [["inline-import", { "extensions": [".sql"] }]]
  };
};