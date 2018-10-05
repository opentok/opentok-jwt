module.exports = {
  "extends": "airbnb",
  "env": {
    "node": true,
    "jest/globals": true,
    "jest": true,
  },
  "rules": {
    "global-require": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  "plugins": ["jest"],
};
