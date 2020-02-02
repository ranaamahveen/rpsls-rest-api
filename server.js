const express = require(`express`);
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
app.use(bodyParser.json());
const axios = require(`axios`);
const cors = require("cors");
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/random/choices", function(req, res) {
  console.log("requesst:", req.params.id);
  res.json([
    {
      id: 1,
      name: "rock"
    },
    {
      id: 2,
      name: "paper"
    },
    {
      id: 3,
      name: "scissors"
    },
    {
      id: 4,
      name: "lizard"
    },
    {
      id: 5,
      name: "spok"
    }
  ]);
});

app.get("/random/choice", function(req, res) {
  console.log("here");
  axios
    .get(`https://codechallenge.boohma.com/choice`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
      res.error(error);
    });
  console.log(res);
  return res;
});
app.post("/random/play", function(req, res) {
  console.log("player", req.body.playerChoice);
  var playerChoice = req.body.playerChoice;
  console.log("player", playerChoice);
  var result = "";
  axios
    .get(`https://codechallenge.boohma.com/choice`)
    .then(response => {
      console.log("can this be done: ", response.data.id == playerChoice);
      if (response.data.id == playerChoice) {
        result = "tie";
        res.json({
          results: result,
          player: playerChoice,
          computer: response.data.id
        });
      }
      if (response.data.id == 1) {
        if (playerChoice == 2 || playerChoice == 5) {
          result = "win";
        } else {
          result = "lose";
        }
      } else if (response.data.id == 2) {
        if (playerChoice == 3 || playerChoice == 4) {
          result = "win";
        } else {
          result = "lose";
        }
      } else if (response.data.id == 3) {
        if (playerChoice == 5 || playerChoice == 1) {
          result = "win";
        } else {
          result = "lose";
        }
      } else if (response.data.id == 4) {
        if (playerChoice == 1 || playerChoice == 3) {
          result = "win";
        } else {
          result = "lose";
        }
      } else if (response.data.id == 5) {
        if (playerChoice == 4 || playerChoice == 2) {
          result = "win";
        } else {
          result = "lose";
        }
      }
      res.json({
        results: result,
        player: playerChoice,
        computer: response.data.id
      });
    })
    .catch(error => {
      console.log(error);
      res.error(error);
    });
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
