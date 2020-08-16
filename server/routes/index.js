const express = require("express");
const userDB = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await userDB.all();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
  }
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const response = await userDB.userBy("id", req.params.id);
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const response = await userDB.userBy("name", req.params.name);
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
  }
});

module.exports = router;
