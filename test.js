const { promisify } = require('util');
const { decode, verify: jwtVerify } = require('jsonwebtoken');
const lib = require('./lib');

const jwtVerifyP = promisify(jwtVerify);

const {
  accountToken, projectToken, generateToken, verify,
} = lib;

const accountJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUElfS0VZIiwiaXN0IjoiYWNjb3VudCIsImlhdCI6MTUzOTA5MywiZXhwIjo0MTMxMDkzfQ.b5BvdeNtuJPzoZjqMNe-wQPqJOEnLTPkqwwgsK6KtpI';
const projectJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUElfS0VZIiwiaXN0IjoicHJvamVjdCIsImlhdCI6MTUzOTA5MywiZXhwIjo0MTMxMDkzfQ.Mb_mwsvs5wW0Bf-BCFDGdmkOXYpQvvD14EXOWlJ3r7k';
const accountJWTCustomExp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUElfS0VZIiwiaXN0IjoiYWNjb3VudCIsImlhdCI6MTUzOTA5MywiZXhwIjoxNjI1NDkzfQ.mG533LCwrOPBkgCR0EgQtSOM1L31JavQRLv_266kDnM';
const projectJWTCustomExp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUElfS0VZIiwiaXN0IjoicHJvamVjdCIsImlhdCI6MTUzOTA5MywiZXhwIjoxNjI1NDkzfQ.iIV-84cmarQtbT4RYW9DIEXPhhAwnr8S3Znisv-LnUw';

const apiKey = 'API_KEY';
const secret = 'SECRET';
const timestamp = 1539093828;
const currentTime = Math.floor(timestamp / 1000);
const customExpiry = currentTime + (24 * 60 * 60);
const defaultExpiry = currentTime + (30 * 24 * 60 * 60);
const RealDate = Date;
const mockDate = (isoDate) => {
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(isoDate);
    }
  };
};
describe('lib', () => {
  describe('verify', () => {
    it('should decode token', async (done) => {
      const currentTimestamp = new Date();
      mockDate(currentTimestamp);
      const exp = Math.floor(currentTimestamp / 1000) + (30 * 24 * 60 * 60);
      const token = accountToken(apiKey, secret);
      const decoded = await verify(token, secret);
      expect(decoded.iss).toEqual(apiKey);
      expect(decoded.exp).toEqual(exp);
      done();
    });

    it('should pass errors on from jwt library', async (done) => {
      let jwtError;
      let opentokJwtError;

      try {
        await jwtVerifyP(accountJWT, secret);
      } catch (err) {
        jwtError = err;
      }

      try {
        await jwtVerifyP(accountJWT, secret);
      } catch (err) {
        opentokJwtError = err;
      }
      expect(opentokJwtError).toEqual(jwtError);
      done();
    });
  });

  describe('regression tests with mocked date', () => {
    beforeAll(() => {
      mockDate(timestamp);
    });

    afterAll(() => {
      global.Date = RealDate;
    });

    describe('accountToken', () => {
      it('should return account jwt token', async (done) => {
        const token = accountToken(apiKey, secret);
        expect(token).toEqual(accountJWT);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(defaultExpiry);
        done();
      });

      it('should return account jwt token with custom expire', async (done) => {
        const token = accountToken(apiKey, secret, customExpiry);
        expect(token).toEqual(accountJWTCustomExp);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(customExpiry);
        done();
      });
    });

    describe('projectToken', () => {
      it('should return project jwt token', async (done) => {
        const token = projectToken(apiKey, secret);
        expect(token).toEqual(projectJWT);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(defaultExpiry);
        done();
      });

      it('should return project jwt token with custom expire', async (done) => {
        const token = projectToken(apiKey, secret, customExpiry);
        expect(token).toEqual(projectJWTCustomExp);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(customExpiry);
        done();
      });
    });

    describe('generateToken', () => {
      it('should return project jwt token', async (done) => {
        const token = generateToken(apiKey, secret, 'project');
        expect(token).toEqual(projectJWT);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(defaultExpiry);
        done();
      });

      it('should return project jwt token with custom expire', async (done) => {
        const token = generateToken(apiKey, secret, 'project', customExpiry);
        expect(token).toEqual(projectJWTCustomExp);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(customExpiry);
        done();
      });


      it('should return account jwt token', async (done) => {
        const token = generateToken(apiKey, secret, 'account');
        expect(token).toEqual(accountJWT);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(defaultExpiry);
        done();
      });

      it('should return account jwt token with custom expire', async (done) => {
        const token = generateToken(apiKey, secret, 'account', customExpiry);
        expect(token).toEqual(accountJWTCustomExp);
        const decoded = await decode(token, secret);
        expect(decoded.exp).toEqual(customExpiry);
        done();
      });
    });
  });
});
