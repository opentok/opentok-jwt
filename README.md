# opentok-jwt

Node module to generate a JWT token given an apiKey and secret.
Useful for automated tests against the Opentok API server or other scenarios when you might need to generate these tokens.

## Install

```
npm install --save opentok-jwt
```

## Usage

```
const { accountToken, generateToken, projectToken } = require('opentok-jwt');

const apiKey = <yourAPIKey>;
const apiSecret = <yourAPISecret>;

const projectJWT = projectToken(apiKey, apiSecret);
const accountJWT = projectToken(apiKey, apiSecret);
// or
const projectJWT = generateToken(apiKey, secret, 'project');
const accountJWT = generateToken(apiKey, apiSecret, 'account');

// With custom expiry (Default 30 days)
const expires = Math.floor(new Date() / 1000) + (24 * 60 * 60); // Now + 1 day
const accountJWT = accountToken(apiKey, apiSecret, expires);
const projectJWT = projectToken(apiKey, apiSecret, expires);
// or

const accountJWT = generateToken(apiKey, apiSecret, 'account', expires);
const projectJWT = generateToken(apiKey, apiSecret, 'project', expires);
```
