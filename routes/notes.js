// Creates router object to handle requests for /api/notes.
const notes = require("express").Router();

// Access to functions in crypto module.
const crypto = require("crypto");

// Helper functions for reading and creating Notes JSON file.
const {
  readFilePromise,
  readAndWrite,
  deleteFile,
} = require("../helpers/fsPromises");

// GET route for retrieving all the notes. Path: /api/notes
notes.get("/", (req, res) => {
  console.info(`\n${req.method} request received!`);
  readFilePromise("./db/notes.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => {
      console.error(error);
    });
});

// POST route for subbmitting new notes. Path: /api/notes
notes.post("/", (req, res) => {
  console.info(`\n${req.method} request received!`);

  // Destructuring data we are sending in our body. (Note Title / Note Text)
  const { title, text } = req.body;

  // Save new object for our note if all properties are present.
  // Use crypto.randomUUID() method to geneerate UUID using secure random number generator.
  if (title && text) {
    const newNote = {
      title,
      text,
      id: crypto.randomUUID(),
    };

    // Use our helper function created in fsPromises.js
    // Promise will read, parse and then create a new updated file.
    readAndWrite(newNote, "./db/notes.json");

    const response = {
      status: "success",
      body: newNote,
    };

    // Will log our successful response in the terminal.
    console.log(response);

    // Sets the HTTP status for the response.
    // 201 indicates the server has successfully processed the request.
    res.status(201).json(response);
  } else {
    res.status(404).json("\nError in posting note.");
  }
});

// DELETE route for removing existing notes. Path: /api/notes/:id
notes.delete("/:id", (req, res) => {
  console.info(`\n${req.method} request received!`);
  deleteFile(req.params, "./db/notes.json");
  res.json(true);
});

module.exports = notes;
