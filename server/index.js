const cors = require("cors");
const express = require("express");

const apiRouter = require("./routes");

const app = express();

app.use(cors());

app.use("/api", apiRouter);

app.listen(process.env.REACT_APP_SERVER_PORT || 8000, () => {
  console.log(
    `App server now listening on port ${
      process.env.REACT_APP_SERVER_PORT || 8000
    }`
  );
});
