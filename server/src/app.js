import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api);
const server = http.createServer(app);


mongoose.connect(mongo.uri, { useMongoClient: true });
mongoose.Promise = Promise;
var actionsDb = mongoose.connection.collection('actions');

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});


app.get('/testEndpoint', function(req, res){
  res.send('Got the data now')
});

app.get('/getAction', function(req, res){
  var action = req.query.action;
  console.log(action)
  var query = actionsDb.findOne({'actionId' : action},
    function(err, data){
    if(err){
      console.log(err);
      res.send("Error getting data");
    }
    console.log("got the data");
    console.log(data);
    res.send(data);
  })
  // res.send('Got the data now');
});





// You can find your project ID in your Dialogflow agent settings
const projectId = 'hackathonapi-45c56'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

app.get('/getDialog', function(req, res){
  var dialogText = req.query.dialogText;


// The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: dialogText,
        languageCode: languageCode,
      },
    },
  };

// Send request and log result
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      res.send(result);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });




  // res.send('Got the data now');
});


export default app
