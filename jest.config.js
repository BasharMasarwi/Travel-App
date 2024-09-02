module.exports = {
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$"
  ],
};
