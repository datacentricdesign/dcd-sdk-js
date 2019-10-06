import {API} from "./API";
import {StatService} from "..";

export class StatAPI extends API {

    protected init() {
        super.init();

        this.router.get('/stats',
            async (req, res, next) => {
                const result = await StatService.getGlobalStats(req['user'].accessToken);
                res.send(result)
            });

        this.router.get('/stats/propertyTypes',
            async (req, res, next) => {
                if (!req.query.types) {
                    res.status(400).send({
                        message: 'types is undefined'
                    });
                } else {
                    let propertyTypes = req.query.types.split(',');
                    const from = req.query.from;
                    const to = req.query.to;
                    if (from && to) {
                        console.log('get', 'api/stats/propertyTypes?from=' + from + '&to=' + to, propertyTypes);
                    } else {
                        console.log('get', 'api/stats/propertyType', propertyTypes);
                    }
                    const result = await StatService.getPropertyTypesStats(propertyTypes, req['user'].accessToken, from, to);
                    res.send(result)
                }
            });
    }

}
