
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as refresh from 'passport-oauth2-refresh';
import * as passport from 'passport';
import {Strategy} from './passport-dcd/strategy';
import * as cors from 'cors';
import {ThingAPI} from "./api/ThingAPI";
import {PersonAPI} from "./api/PersonAPI";
import {StatAPI} from "./api/StatAPI";
import {TaskAPI} from "./api/TaskAPI";
import {DCDModel} from "./index";

class DCDOptions {
    baseUrl: string = process.env.BASE_URL || '';
    strategy: StrategyOptions
}

class StrategyOptions {
    authorizationURL: string = process.env.OAUTH2_AUTH_URL;
    tokenURL: string = process.env.OAUTH2_TOKEN_URL;
    clientID: string = process.env.OAUTH2_CLIENT_ID;
    clientSecret: string = process.env.OAUTH2_CLIENT_SECRET;
    callbackURL: string = process.env.OAUTH2_REDIRECT_URL;
    userProfileURL: string = process.env.OAUTH2_PROFILE;
    state: boolean = true;
    scope: Array<string> = ['offline', 'openid', 'profile', 'dcd:things', 'dcd:persons'];
}

export class DCDApp {
    private readonly model: DCDModel;
    private readonly options: DCDOptions;
    private readonly baseUrl: string;

    public readonly app : express;

    private thingAPI: ThingAPI;
    private personAPI: PersonAPI;
    private statAPI: StatAPI;
    private taskAPI: TaskAPI;

    constructor(model: DCDModel, options: DCDOptions) {
        this.model = model;
        this.options = options;

        this.baseUrl = options.baseUrl;

        this.app = express();

        passport.use('oauth2', new Strategy(options.strategy,
            (accessToken, refreshToken, profile, cb) => cb(null, {accessToken, profile})
        ));

        passport.use('refresh', refresh);

        passport.serializeUser((user, done) => {
            done(null, JSON.stringify(user));
        });

        passport.deserializeUser((user, done) => {
            done(null, JSON.parse(user));
        });

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());

        // These are middlewares required by passport js
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false}
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.get(this.baseUrl + '/auth', passport.authenticate('oauth2'));
        this.app.get(new URL(this.options.strategy.callbackURL).pathname,
            passport.authenticate('oauth2',
            {failureRedirect: '/auth', failWithError: true}),
            (req, res) => {
                // After success, redirect to the page we came from originally
                console.log('/auth/callback ' + req['session'].redirectTo);
                res.redirect(req['session'].redirectTo);
            }
        );
    }

    initAPIs() {
        this.thingAPI = new ThingAPI(this.model, this.baseUrl);
        this.app.use(this.baseUrl + '/api/things', this.thingAPI.router);
        this.personAPI = new PersonAPI(this, this.baseUrl);
        this.app.use(this.baseUrl + '/api/persons', this.personAPI.router);
        this.statAPI = new StatAPI(this, this.baseUrl);
        this.app.use(this.baseUrl + '/api/stats', this.statAPI.router);
        this.taskAPI = new TaskAPI(this, this.baseUrl);
        this.app.use(this.baseUrl + '/api/tasks', this.taskAPI.router);

        this.app.get(this.baseUrl + '/logout',
            (req, res) => {
                req.logout();
                res.redirect(this.baseUrl + '/');
            })
    }

}


