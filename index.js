// init project
var express = require("express");
var app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// log requests in console
app.use("/", function (req, res, next) {
  console.log("+++");
  console.log(req.method + " " + req.path + " - " + req.ip);
  console.log("---");
  next();
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// handle date
app.get("/api/:date", function (req, res) {
  console.log("+++");

  console.log("Passed in date:", req.params.date);

  let date = new Date(req.params.date).toUTCString();
  let unixDate = +req.params.date;

  console.log("date:", date);
  console.log("unixDate:", unixDate);

  if (unixDate >= 0) {
    console.log("Unix date passed in:", req.params.date);
    res.json({ unix: unixDate, utc: new Date(unixDate).toUTCString() });
  } else if (date === "Invalid Date") {
    console.log("Invalid date passed in:", req.params.date);
    res.json({ error: "Invalid Date" });
  } else {
    console.log("Non-unix valid date passed in:", req.params.date);
    res.json({ unix: Date.parse(req.params.date), utc: date });
  }

  console.log("---");
});

// handle empty date
app.get("/api/", function (req, res) {
  console.log("+++");
  console.log("Empty date passed in");
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
  console.log("---");
});
