// The built-in Node.js file system module helps us store, access and manage data.
const fs = require("fs");

// The Util module provides access to some built-in Node.js utility functions.
const util = require("util");

// Takes a function following the Node.js callback readFile() method and returns a version that returns a promise.
const readFilePromise = util.promisify(fs.readFile);

/**
 * Param tags: Type / Name / Description
 * Function to create a JSON file.
 *  @param {object} newParsedData - Newly parsed note we want to write to the file.
 *  @param {string} filePath - Name of file we want to create.
 *  @returns {void} - Returns Nothing.
 */
const writeFilePromise = (filePath, newParsedData) =>
  fs.writeFile(filePath, JSON.stringify(newParsedData, null, 4), (err) =>
    err
      ? console.error(err)
      : console.info(`\nSuccessfully updated Notes in Path: ${filePath}`)
  );

/**
 * Param tags: Type / Name / Description
 * Function to read data from a file and recreate a new file with updated data.
 *  @param {string} file - Path of file we want read so we may modify then recreate.
 *  @param {object} newNote - Newly created note we want to append to the notes.json file.
 *  @returns {void} - Returns Nothing.
 */
const readAppendPromise = (newNote, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      writeFilePromise(file, parsedData);
    }
  });
};

module.exports = { readFilePromise, writeFilePromise, readAppendPromise };
