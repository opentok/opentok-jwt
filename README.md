# opentok-jwt

<img src="https://assets.tokbox.com/img/vonage/Vonage_VideoAPI_black.svg" height="48px" alt="Tokbox is now known as Vonage" />

Node module to generate a JWT token given an apiKey and secret.
Useful for automated tests against the Opentok API server or other scenarios when you might need to generate these tokens.

## Install

```JS
npm install --save opentok-jwt
```

## Usage

```JS
const { accountToken, generateToken, projectToken, verify } = require('opentok-jwt');

const apiKey = <yourAPIKey>;
const apiSecret = <yourAPISecret>;

const projectJWT = projectToken(apiKey, apiSecret);
const accountJWT = accountToken(apiKey, apiSecret);
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

// Verify
const decoded = await verify(token, secret);
```

## Development and Contributing

Interested in contributing? We :heart: pull requests! See the
[Contribution](CONTRIBUTING.md) guidelines.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- Open an issue on this repository
- See <https://support.tokbox.com/> for support options
- Tweet at us! We're [@VonageDev](https://twitter.com/VonageDev) on Twitter
- Or [join the Vonage Developer Community Slack](https://developer.nexmo.com/community/slack)
