import * as express from "express";
import {DCDModel} from "../index";

export class API {
    public router: express.Router;
    protected model: DCDModel;
    protected baseUrl : string;

    constructor(model, baseUrl) {
        this.router = express.Router();
        this.model = model;
        this.baseUrl = baseUrl;
        this.init()
    }

    protected init() {

    }

    // This is a middleware that checks if the user is authenticated.
    // It also remembers the URL so it can be used to
    // redirect to it after the user authenticated.
    checkAuthentication(req, res, next) {
        if (!req.isAuthenticated()) {
            req.session.redirectTo = req.url;
            res.redirect(this.baseUrl + '/auth');
            return;
        }
        next();
    };
}
