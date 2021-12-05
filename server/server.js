// Create our app
const express = require("express");
const app = express();
app.use(express.json())

// Set some environment variables
const args = process.argv.slice(2);
const server_port = Number(args[0]);

//Register Pages here
const INIT_PAGE = 'init'
const WELCOME_PAGE = 'welcome'
const ERROR_PAGE = 'error'

const handlePageChange =  (req) => {
    if (req.page_name === INIT_PAGE) {
        return WELCOME_PAGE
    }
    if (req.page_name === WELCOME_PAGE) {
        return INIT_PAGE
    }

    else {
        console.log("No such page")
        return ERROR_PAGE
    }
}
app.get("/", (req, res) => {
    console.log("We got something!")
    res.send("Hello World!");
});

app.post('/', (req, res) => {
    console.log("Got something: ", req.body);

    let response = {
        next_page: handlePageChange(req.body)
        // next_page: handlePageChange(req.body).then((next_page) => next_page)
    }
    console.log(response)
    res.json(response);
});


// Listen on all interfaces
app.listen(server_port, '0.0.0.0', () => console.log("Server listening on port", server_port, "!"));
