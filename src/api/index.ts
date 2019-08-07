import * as express from "express";
const router = express.Router();

import {PersonService} from '../services/person_service'
import {ThingService} from '../services/thing_service'
import {PropertyService} from '../services/property_service' 

router.delete('/logout',
    async (req, res, next) => {
        const subject = req.query.subject
        console.log('logout'+'?subject=' + subject)
        const result = await PersonService.logout(subject,req['user'].accessToken)
        console.log(result)
        res.send(result)
});

router.get('/things',
      async (req, res, next) => {
          console.log('api/things')
          const result = await ThingService.list(req['user'].accessToken)
          res.send(result)
});
  
router.get('/things/:thingId',
       async (req, res, next) => {
          const thingId = req.params.thingId;
          console.log('api/things/'+thingId)
          const result = await ThingService.read(thingId,req['user'].accessToken)
          res.send(result)
});
  
  
router.get('/user',
       async (req, res, next) => {
          console.log('api/user')
          const result = await PersonService.readUser(req['user'].accessToken)
          res.send(result)
});
  
router.get('/persons/:userId',
       async (req, res, next) => {
          const userId = req.params.userId;
          console.log('api/user/'+userId)
          const result = await PersonService.readUserId(userId,req['user'].accessToken)
          res.send(result)
});
  
router.get('/things/:thingId/properties/:propertyId',
       async (req, res, next) => {
        const thingId = req.params.thingId
        const propertyId = req.params.propertyId
        const from = req.query.from
        const to = req.query.to 
        console.log('api/things/'+thingId+'/properties/'+propertyId+'?from=' + from + '&to=' + to);
        const result = await PropertyService.read(thingId,propertyId,from,to,req['user'].accessToken)
        res.send(result)
});
  
router.delete('/things/:thingId',
       async (req, res, next) => {
          const thingId = req.params.thingId
          console.log('delete','api/things/'+thingId)
          const result = await ThingService.delete(thingId,req['user'].accessToken)
          res.send(result)
});
  
router.delete('/things/:thingId/properties/:propertyId',
       async (req, res, next) => {
          const thingId = req.params.thingId
          const propertyId = req.params.propertyId
          console.log('delete','api/things/'+thingId+'/properties/'+propertyId)
          const result = await PropertyService.delete(thingId,propertyId,req['user'].accessToken)
          res.send(result)
});
  
router.post('/things',
        async (req, res, next) => {
            const jwt = req.query.jwt
            const body = req.body
            console.log('post','api/things/'+'?jwt=' + jwt,body)
            const result = await ThingService.create(body,jwt,req['user'].accessToken)
            res.send(result)
});
  
router.post('/things/:thingId/properties',
          async (req, res, next) => {
              const thingId = req.params.thingId
              const body = req.body
              console.log('post','api/things/'+thingId+'/properties',body)
              const result = await PropertyService.create(thingId,body,req['user'].accessToken)
              res.send(result)
});

export const RouterAPI = router