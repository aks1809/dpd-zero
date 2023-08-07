import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

export default (app) => {
  // app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(
    express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
  );
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: 'my_secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
  app.use('*', (req, res, next) => {
    console.log(`Quering route ${req.method} -- ${req.originalUrl}`);
    next();
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
