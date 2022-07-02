const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const defaultUsers = require("./users.json");

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
let users = defaultUsers.slice();

app.use(express.static('build'));
app.use(bodyParser.json());

app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT + "...");
});

app.post("/api/signin", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (users.some(u => u.login === login && u.password === password)) {
        const fullName = users
            .find(u => u.login === login && u.password === password)?.fullName;
        res.send({
            result: "ok",
            fullName,
        });
    } else {
        res.send({
            result: "not found"
        });
    }
});

app.post("/api/signup", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const fullName = req.body.fullName;

    if (users.some(u => u.login === login)) {
        res.sendStatus(409);
    } else {
        users = [{ login, password, fullName }, ...users.slice()];
        res.sendStatus(201);
    }
});