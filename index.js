const apiKey =
  "98d2e58a8af8bc90737ebdb83a862ab467d6fa19f8986cfa70ea7689286cc6d6";
const username = "alexkemboi97";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const africastalking = require("africastalking")({ username, apiKey });
const voice = africastalking.VOICE;

const options = {
  from: "+254726837210",
  to: "+254711082571 ",
  callBackUrl: "https://de2c-41-139-168-163.eu.ngrok.io/dtmf_callback",
};

app.post("/dtmf_callback", (req, res) => {
  const data = req.body;
  console.log(data);

  voice.emit("onDtmfReceived", data);

  res.sendStatus(200);
});

voice
  .call(options)
  .then((result) => {
    console.log(result);

    const sessionId = result.data.sessionId;

    voice.on("onDtmfReceived", (data) => {
      const dtmf = data.dtmfDigit;
      console.log(`DTMF digit received: ${dtmf}`);
      if (dtmf === "1") {
        // do something if the user pressed 1
      } else if (dtmf === "2") {
        // do something if the user pressed 2
      } else {
        // handle invalid input
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000, () => {
  console.log("Webhook listening on port 3000");
});
