module.exports = {
  plugins: {
    "postcss-import": {},
    stylelint: {},
    "postcss-reporter": { clearReportedMessages: true },
    "postcss-preset-env": {
      browsers: "last 2 versions",
    },
  },
}
