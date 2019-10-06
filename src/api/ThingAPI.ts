import {API} from "./API";
import {PropertyService} from "..";

export class ThingAPI extends API{

    protected init() {
        super.init();

        this.router.get('/things',
            async (req, res, next) => {
                const result = await this.model.getThings().list(req['user'].accessToken);
                res.send(result)
            });

        this.router.get('/things/:thingId',
            async (req, res, next) => {
                const thingId = req.params.thingId;
                const result = await this.model.getThings().read(thingId, req['user'].accessToken);
                res.send(result)
            });

        this.router.get('/things/:thingId/properties/:propertyId',
            async (req, res, next) => {
                const thingId = req.params.thingId;
                const propertyId = req.params.propertyId;
                const from = req.query.from;
                const to = req.query.to;
                if (from && to) {
                    console.log('get', 'api/things/' + thingId + '/properties/' + propertyId + '?from=' + from + '&to=' + to);
                } else {
                    console.log('get', 'api/things/' + thingId + '/properties/' + propertyId);
                }
                const result = await this.model.getProperties().read(thingId, propertyId, req['user'].accessToken, from, to);
                res.send(result)
            });

        this.router.delete('/things/:thingId',
            async (req, res, next) => {
                const thingId = req.params.thingId;
                console.log('delete', 'api/things/' + thingId);
                const result = await this.model.getThings().delete(thingId, req['user'].accessToken);
                res.send(result)
            });

        this.router.delete('/things/:thingId/properties/:propertyId',
            async (req, res, next) => {
                const thingId = req.params.thingId;
                const propertyId = req.params.propertyId;
                console.log('delete', 'api/things/' + thingId + '/properties/' + propertyId);
                const result = await this.model.getProperties().delete(thingId, propertyId, req['user'].accessToken);
                res.send(result)
            });

        this.router.post('/things',
            async (req, res, next) => {
                const jwt = req.query.jwt !== undefined ? req.query.jwt : false;
                const body = req.body;
                console.log('post', 'api/things?jwt=' + jwt, body);
                const result = await this.model.getThings().create(body, jwt, req['user'].accessToken);
                res.send(result)
            });

        this.router.post('/things/:thingId/properties',
            async (req, res, next) => {
                const thingId = req.params.thingId;
                const body = req.body;
                console.log('post', 'api/things/' + thingId + '/properties', body);
                const result = await this.model.getProperties().create(thingId, body, req['user'].accessToken);
                res.send(result)
            });
    }

}
