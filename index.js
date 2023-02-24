const africastalking = require("africastalking")({
  apiKey: "bc2699fb58d81d07784e273e3e2485f10e788dbe68e67ecbc53d5a54647b2cf8",
  username: "alexkemboi97",
});

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(axios);

const voice = africastalking.VOICE;

app.post("/call", (req, res) => {
  console.log(req.body);
  // const callFrom = req.body.callFrom;
  // const callTo = req.body.callTo;
  // const sessionId = req.body.sessionId;
  const options = {
    callFrom: req.body.callFrom,
    callTo: req.body.callTo,
  };
  let response = '<?xml version="1.0" encoding="UTF-8"?>';
  response += "<Response>";
  response +=
    '<GetDigits timeout="20" callbackUrl="https://e6dc-41-90-65-190.in.ngrok.io/call">';
  response += "<Say>Please press 1 to continue</Say>";
  response += "</GetDigits>";
  response += "</Response>";

  voice.call(options).then(console.log(req.body)).catch(console.log);
});

app.listen(80, () => {
  console.log("Webhook listening on port 80");
});
