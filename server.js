
// get the lib from the local compiled folder (after npm run prepare)
const dcd = require('./dist/index');

// get the app and auth method from the lib
const app = dcd.app;
const checkAuthentication = dcd.checkAuthentication;

// load environment variables from .env file
const dotEnv = require('dotenv');
const findConfig = require('find-config');
dotEnv.config({path: findConfig('.env')});

// if PORT and BASE_URL exists in .env, use them otherwise take 8080 and ''
const PORT = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || '';

// A basic route that get the authentication, then fetch the Things
app.get(baseUrl + '/', checkAuthentication,
  async (req, res) => {
    dcd.ThingService.list(req['user'].accessToken)
      .then((data)=> {
        res.send(data);
      });
  });

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}${baseUrl}`);
});
