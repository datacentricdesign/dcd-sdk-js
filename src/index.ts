import {ThingService} from "./services/ThingService";
import {PersonService} from "./services/PersonService";
import {PropertyService} from "./services/PropertyService";
import {StatService} from "./services/StatService";
import {TaskService} from "./services/TaskService";


import {ThingAPI} from "./api/ThingAPI";
import {PersonAPI} from "./api/PersonAPI";
import {StatAPI} from "./api/StatAPI";
import {TaskAPI} from "./api/TaskAPI";
import {DCDApp} from "./DCDApp";

export { Person } from './entities/person'
export { Property } from './entities/property'
export { PropertyType } from './entities/property'
export { Thing } from './entities/thing'

export {GETRequest, POSTRequest, PUTRequest,DELETERequest,POSTRequestWithTimeOut,GETRequestWithBody} from './helpers/http'

export {Service} from './services/Service'
export {ThingService} from './services/ThingService'
export {PersonService} from './services/PersonService'
export {PropertyService} from './services/PropertyService'
export {StatService} from './services/StatService'
export {TaskService} from './services/TaskService'

export const Strategy = require('./passport-dcd/strategy');

const settings = {
    url: {
        profile: process.env.OAUTH2_PROFILE,
        api: process.env.API_URL,
        auth: process.env.OAUTH2_AUTH_URL,
        revoke: process.env.OAUTH2_REVOKE_URL
    },
    client: {
        id: process.env.OAUTH2_CLIENT_ID,
        secret: process.env.OAUTH2_CLIENT_SECRET
    }
};

export class DCDModel {
    private readonly things: ThingService;
    private readonly persons: PersonService;
    private readonly properties: PropertyService;
    private readonly stats: StatService;
    private readonly tasks: TaskService;

    constructor(settings) {
        this.things = new ThingService(settings);
        this.persons = new PersonService(settings);
        this.properties = new PropertyService(settings);
        this.stats = new StatService(settings);
        this.tasks = new TaskService(settings);
    }

    getThings() {
        return this.things;
    }

    getPersons() {
        return this.persons;
    }

    getProperties() {
        return this.properties;
    }

    getStats() {
        return this.stats;
    }

    getTasks() {
        return this.tasks;
    }

}

export {DCDApp} from './DCDApp';
