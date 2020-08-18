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
    res.render("error", { error: err });
  }
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const response = await userDB.userBy("id", req.params.id);
    // TODO: return reviewers
    // TODO: return employee to review and date and review id
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
    res.render("error", { error: err });
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const response = await userDB.userBy("name", req.params.name);
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
    res.render("error", { error: err });
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const response = await userDB.putById(req.params.id, req.body);
    res.json({ status: "changed", id: req.params.id, response });
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
    res.render("error", { error: err });
  }
});

router.put("/new", async (req, res, next) => {
  try {
    const response = await userDB.putNew(req.body);
    res.json(response);
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
    res.render("error", { error: err });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await userDB.deleteById(req.params.id, req.body);
    res.json({ status: "deleted", id: req.params.id, response });
  } catch (error) {
    console.log({ error });
    res.statusCode(500);
    res.render("error", { error: err });
  }
});

module.exports = router;
