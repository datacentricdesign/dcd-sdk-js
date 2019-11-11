
// .env
import * as dotEnv from 'dotenv';
import * as findConfig from 'find-config';

dotEnv.config({path: findConfig('.env')});

import * as express from 'express';
import {join} from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as refresh from 'passport-oauth2-refresh';
import * as passport from 'passport';
import {Strategy, RouterAPI} from '.';
import * as cors from 'cors';

// Express server
export const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist');

// app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser', 'subject'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

const baseUrl = process.env.BASE_URL || '';

const redirectPath = new URL(process.env.OAUTH2_REDIRECT_URL).pathname;

const google_maps_key = process.env.MAPS_KEY;

const strategyOptions = {
    authorizationURL: process.env.OAUTH2_AUTH_URL,
    tokenURL: process.env.OAUTH2_TOKEN_URL,
    clientID: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    callbackURL: process.env.OAUTH2_REDIRECT_URL,
    userProfileURL: process.env.OAUTH2_PROFILE,
    state: true,
    scope: ['offline', 'openid', 'profile', 'dcd:things', 'dcd:persons']
};

passport.use('oauth2', new Strategy(strategyOptions,
    (accessToken, refreshToken, profile, cb) => cb(null, {accessToken, profile})
));

passport.use('refresh', refresh);

passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// These are middleware required by passport js
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());


// This is a middleware that checks if the user is authenticated. It also remembers the URL so it can be used to
// redirect to it after the user authenticated.
export const checkAuthentication = (req, res, next) => {
    console.log('check authentication');
    console.log('is authenticated: ' + req.isAuthenticated());
    // The `isAuthenticated` is available because of Passport.js
    if (!req.isAuthenticated()) {
        req.session.redirectTo = req.url;
        res.redirect(baseUrl + '/auth');
        return;
    }
    next();
};

app.get(baseUrl + '/auth', passport.authenticate('oauth2'));

app.get(redirectPath, passport.authenticate('oauth2',
    {failureRedirect: '/auth', failWithError: true}),
    (req, res) => {
        // After success, redirect to the page we came from originally
        console.log('/auth/callback ' + req['session'].redirectTo);
        res.redirect(req['session'].redirectTo);
    }
);

// Retrieve mapsKey
app.get(baseUrl + '/mapsKey', checkAuthentication
    , (req, res) => {
        console.log('mapsKey');
        res.send(
            {key: google_maps_key}
        );
    });

// API
app.use(baseUrl + '/api', checkAuthentication, RouterAPI);

app.get(baseUrl + '/logout',
    (req, res) => {
        req.logout();
        res.redirect(baseUrl + '/');
    });
