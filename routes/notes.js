const notes = require("express").Router();

const util = require("util");

const fs = require("fs");

const readFromFile = util.promisify(fs.readFile);

notes.get("/", (req, res) => {
  readFromFile("./db/notes.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => {
      console.error(error);
    });
});

module.exports = notes;
