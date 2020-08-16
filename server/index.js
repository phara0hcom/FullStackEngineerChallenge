const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");

const apiRouter = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use("/api", apiRouter);

app.listen(process.env.REACT_APP_SERVER_PORT || 8000, () => {
  console.log(
    `App server now listening on port ${
      process.env.REACT_APP_SERVER_PORT || 8000
    }`
  );
});
