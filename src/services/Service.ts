import * as http from '../helpers/http'

export class Service {
    protected readonly apiUrl: string;

    constructor(settings) {
        this.apiUrl = settings.url.api;
    }

}
