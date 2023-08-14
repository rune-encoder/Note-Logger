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

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
    };

    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {

        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          './db/notes.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

module.exports = notes;
