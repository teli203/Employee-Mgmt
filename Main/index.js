// Dependencies //
const connection = require("./db/connection.js");
const db = require("./db/index.js"); 

// Connecting to MySQL server //
connection.connect((err) => {
    if (err) {
        throw err;
    }
    db.start(); 
});