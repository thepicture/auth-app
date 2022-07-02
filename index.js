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

app.listen(PORT);

app.post("/api/signin", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    let i = 0;
    let length = users.length;
    while (i < length) {
        const user = users[i];

        const areLoginAndPasswordCorrect =
            areEqualOrdinalIgnoreCase(user.login, login) && user.password === password;

        if (areLoginAndPasswordCorrect) {
            res.send({
                result: "ok",
                fullName: user.fullName,
            });
            return;
        }

        i++;
    }

    res.send({
        result: "not found"
    });
});

app.post("/api/signup", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const fullName = req.body.fullName;

    let i = 0;
    let length = users.length;
    while (i < length) {
        const user = users[i];
        if (areEqualOrdinalIgnoreCase(user.login, login)) {
            res.sendStatus(409);
            return;
        }
        i++;
    }

    users = [{ login, password, fullName }, ...users.slice()];
    res.sendStatus(201);
});

/**
 * @param {string} first
 * @param {string} second
 */
function areEqualOrdinalIgnoreCase(first, second) {
    return first.localeCompare(second, undefined, { sensitivity: 'accent' }) === 0;
}