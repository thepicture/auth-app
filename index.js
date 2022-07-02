const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

let users = [
    { login: "admin", password: "admin", fullName: "foo bar" },
    { login: "user", password: "123", fullName: "bar foo" },
]

app.get('*', (_request, response) => {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT + "...");
});

app.post("/api/signin", (request, response) => {
    const login = request.body.login;
    const password = request.body.password;

    if (users.some(u => u.login === login && u.password === password)) {
        const fullName = users
            .find(u => u.login === login && u.password === password)?.fullName;
        response.send({
            result: "ok",
            fullName,
        });
    } else {
        response.send({
            result: "not found"
        });
    }
});

app.post("/api/signup", (request, response) => {
    const login = request.body.login;
    const password = request.body.password;
    const fullName = request.body.fullName;

    if (users.some(u => u.login === login)) {
        response.sendStatus(409);
    } else {
        users = [{ login, password, fullName }, ...users.slice()];
        response.sendStatus(201);
    }
});