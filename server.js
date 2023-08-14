// Import Express.js
const express = require("express");

// Import Node.js package ''path' to handle path of files that are located on the server.
const path = require("path");

// Import the notes router.
const api = require("./routes/index");

// Specify on which port the Express.js server will run.
const PORT = process.env.PORT || 3001;

// Initialize instance of Express.js
const app = express();

// Middleware for parsing application/json and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder.
app.use(express.static("public"));

// Send all the requests that begin with /api to the index.js in the routes folder. Example: /api
app.use("/api", api);

// This view route is a GET route to the "Note Taking" page: notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// This view route is a GET route to the main page: index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// Used to bind and listen to the connections on the specified host and port.
app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
