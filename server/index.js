const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const DEFAULT_PORT = 3001;
const PORT = process.env.port || DEFAULT_PORT;

const users = [
    { login: "admin", password: "admin", fullname: "foo bar" },
    { login: "user", password: "123", fullname: "bar foo" },
]

app.listen(PORT, () => {
    console.log('Starting to listen on port ' + PORT + "...");
});

app.post("/api/signin", (request, response) => {
    const login = request.body.login;
    const password = request.body.password;

    if (users.some(u => u.login === login && u.password === password)) {
        const fullname = users
            .find(u => u.login === login && u.password === password)?.fullname;
        response.send({
            result: "ok",
            fullname,
        });
    } else {
        response.send({
            result: "not found"
        });
    }
});