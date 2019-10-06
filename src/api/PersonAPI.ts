import {API} from "./API";

export class PersonAPI extends API{

  protected init() {
    super.init();

    this.router.get('/persons',
      async (req, res, next) => {
        console.log('get', 'api/user');
        const result = await this.model.getPersons().list(req['user'].accessToken);
        res.send(result)
      });

    this.router.get('/persons/:userId',
      async (req, res, next) => {
        const userId = req.params.userId;
        console.log('get', 'api/user/' + userId);
        const result = await this.model.getPersons().read(userId, req['user'].accessToken);
        res.send(result)
      });
  }

}
