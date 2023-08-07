import fs from 'fs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import sendHttpResponse from '../response/send_http_response.js';
import { getUser } from './dao.js';

const publicKey = fs.readFileSync('./public.key', 'utf8');
const localOpts = { usernameField: 'username' };
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  issuer: 'DPD',
  algorithm: ['RS256'],
};

// jwt strategy to check if user exists in database through user_id passed as parameter
const jwtAuthentication = new JWTStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await getUser({ user_id: parseInt(payload.aud, 10) });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// local authentication middleware for login takes email and password as parameters
// and checks if user exists in db or not if exists then sends the user object
const localAuthentication = new LocalStrategy(
  localOpts,
  async (username, password, done) => {
    try {
      const user = await getUser({ username });
      if (!user) {
        // user does not exist
        return done({ message: 'Username provided does not exists' }, false);
      }
      if (!user.authenticateUser(password)) {
        // authentication failed, password does not matched
        return done({ message: 'Password Does Not Match' }, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(localAuthentication);
passport.use(jwtAuthentication);

// passport local authentication middleware for login
export const authLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return sendHttpResponse({
        res,
        success: false,
        statusCode: 404,
        code: 'INVALID_CREDENTIALS',
        message:
          'Invalid credentials. The provided username or password is incorrect.',
      });
    }
    return req.login(user, (error) => {
      if (error) {
        return sendHttpResponse({ res, success: false, statusCode: 500 });
      }
      return next(null, user);
    });
  })(req, res, next);
};

// middleware to check validity of token
export const authJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (err) {
      return sendHttpResponse({ res, success: false, statusCode: 500 });
    }
    if (!user) {
      return sendHttpResponse({
        res,
        success: false,
        statusCode: 404,
        code: 'INVALID_TOKEN',
        message: 'Invalid access token provided.',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
