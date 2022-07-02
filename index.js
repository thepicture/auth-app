const path = require('path');
const express = require("express");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const defaultUsers = require("./users.json");

// TODO: move to separate file for deploy
const SECRET_KEY = "1234-abcd-5678-efgh";

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
let users = defaultUsers.slice();

app.use(express.static('build'));
app.use(bodyParser.json());

app.listen(PORT);

app.post("/api/signin", (req, res) => {
    const { login, password } = req.body;

    let i = 0;
    let length = users.length;
    while (i < length) {
        const user = users[i];

        const areLoginAndPasswordCorrect =
            areEqualOrdinalIgnoreCase(user.login, login) && user.password === password;

        if (areLoginAndPasswordCorrect) {
            const token = jwt.sign({ fullName: user.fullName }, SECRET_KEY, { expiresIn: 60 });

            res.send({ token });
            return;
        }

        i++;
    }

    res.sendStatus(401);
});

app.get("/api/users", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, SECRET_KEY)) {
                res.send(users.map(u => u.login.toLowerCase()));
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.post("/api/signup", (req, res) => {
    const { login, password, fullName } = req.body;

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

app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

/**
 * @param {string} first
 * @param {string} second
 */
function areEqualOrdinalIgnoreCase(first, second) {
    return first.localeCompare(second, undefined, { sensitivity: 'accent' }) === 0;
}