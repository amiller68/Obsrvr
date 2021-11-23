// Create our app
const express = require("express");
const app = express();

// Set some environment variables
const args = process.argv.slice(2);
const server_port = Number(args[0]);

app.get("/", (req, res) => {
    console.log("We got something!")
    res.send("Hello World!");
});

// Listen on all interfaces
app.listen(server_port, '0.0.0.0', () => console.log("Server listening on port", server_port, "!"));