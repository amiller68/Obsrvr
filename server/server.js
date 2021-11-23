// const localtunnel = require('localtunnel');
const express = require("express");

const app = express();
const server_port = 3000;

app.get("/", (req, res) => {
    console.log("We got something!")
    res.send("Hello World!");
});

app.listen(server_port, '0.0.0.0', () => console.log("Server listening on port", server_port, "!"));

// (async () => {
//     const tunnel = await localtunnel({ port: http_port });
//
//     // the assigned public url for your tunnel
//     // i.e. https://abcdefgjhij.localtunnel.me
//     console.log(tunnel.url);
//
//
//
//     tunnel.on('close', () => {
//         // tunnels are closed
//     });
// })();