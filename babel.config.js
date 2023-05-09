module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ios.tsx", ".android.tsx", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "~/": "./src",
          },
        },
      ],
    ],
  };
};
