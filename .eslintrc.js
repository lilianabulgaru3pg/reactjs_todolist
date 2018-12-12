module.exports = {
  extends: "airbnb",
  plugins: ["prettier"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "prettier/prettier": ["error", { singleQuote: true }]
  }
};
