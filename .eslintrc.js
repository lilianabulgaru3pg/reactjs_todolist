module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  "parser": "babel-eslint",
  "extends": ["airbnb", "plugin:jest/recommended","plugin:prettier/recommended", "prettier/flowtype", "prettier/react", "prettier/standard"],
  "plugins": ["prettier", "jest"],
  rules: {
    "strict": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}],
    "func-names": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "comma-dangle": ["error", "never"],
    "react/destructuring-assignment": ["<enabled>", 'never'],
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
};
