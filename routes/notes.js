// Creates router object to handle requests for /api/notes.
const notes = require("express").Router();

// Helper functions for reading and creating Notes JSON file.
const {
  readFilePromise,
  readAppendPromise,
} = require("../helpers/fsPromises");

// GET route for retrieving all the notes. Path: /api/notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes API!`);
  readFilePromise("./db/notes.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => {
      console.error(error);
    });
});

// POST route for subbmitting new notes. Path: /api/notes
notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes API!`);

  // Destructuring data we are sending in our body. (Note Title / Note Text)
  const { title, text } = req.body;

  // Save new object for our note if all properties are present.
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    // Use our helper function created in fsPromises.js
    // Promise will read, parse and then create a new updated file. 
    readAppendPromise(newNote, "./db/notes.json");

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
    res.status(404).json("Error in posting note.");
  }
});

module.exports = notes;
