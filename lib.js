const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for Opentok API server
 * @param {Int} apiKey - Opentok API Key
 * @param {String} secret - Opentok API Secret
 * @param {String} issuerType - 'account' or 'project'. Type of token to generate.
 * @param {Int} [defaultValue] - expiry time in seconds timestamp
 * @returns {String} - JWT token
 */
const generateToken = (apiKey, secret, issuerType, expires) => {
  const currentTime = Math.floor(new Date() / 1000);
  return jwt.sign({
    iss: apiKey,
    ist: issuerType,
    iat: currentTime,
    exp: expires || currentTime + (30 * 24 * 60 * 60), // in 30 days
  }, secret);
};

/**
 * Generates an account JWT token for Opentok API server
 * @param {Int} apiKey - Opentok API Key
 * @param {String} secret - Opentok API Secret
 * @param {Int} [defaultValue] - expiry time in seconds timestamp
 * @returns {String} - JWT token
 */
const accountToken = (apiKey, secret, expires) => { // eslint-disable-line arrow-body-style
  return generateToken(apiKey, secret, 'account', expires);
};

/**
 * Generates a project JWT token for Opentok API server
 * @param {Int} apiKey - Opentok API Key
 * @param {String} secret - Opentok API Secret
 * @param {Int} [defaultValue] - expiry time in seconds timestamp
 * @returns {String} - JWT token
 */
const projectToken = (apiKey, secret, expires) => { // eslint-disable-line arrow-body-style
  return generateToken(apiKey, secret, 'project', expires);
};


module.exports = {
  accountToken,
  generateToken,
  projectToken,
};
