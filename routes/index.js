// Import Express.js
const express = require("express");

// Import our files containing our routes.
const notesRouter = require("./notes");

// Create an instance of express so we can apply the middleware and routing.
const app = express();

// Send all the requests that begin with /notes to the notes.js in the routes folder.
// Example: /api/notes
app.use("/notes", notesRouter);

module.exports = app;
