// @ts-nocheck
require("dotenv").config();

const path = require('path');
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const bodyParser = require("body-parser");

const defaultUsers = require("./users.json");
const defaultProducts = require("./goods.json");

const DEFAULT_PORT = 80;
const PORT = process.env.PORT || DEFAULT_PORT;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

let users = defaultUsers.slice();

const app = express();
app.use(cors())


if (process.env.NODE_ENV === "production") {
    console.log("Production enabled");
    app.use(express.static('build'));
}

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Listening on port " + PORT + "...");
});

app.post("/api/signin", (req, res) => {
    const { login, password } = req.body;

    let i = 0;
    let length = users.length;
    while (i < length) {
        const user = users[i];

        const areLoginAndPasswordCorrect =
            areEqualOrdinalIgnoreCase(user.login, login) && user.password === password;

        if (areLoginAndPasswordCorrect) {
            const token = jwt.sign({ role: user.role }, PRIVATE_KEY, { expiresIn: 60 });

            res.send({ token, user: { id: user.id, fullName: user.fullName } });
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
            if (jwt.verify(token, PRIVATE_KEY)) {
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

    users = [{ login, password, fullName, role: "user" }, ...users.slice()];
    res.sendStatus(201);
});

app.get("/api/goods", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, PRIVATE_KEY)) {
                res.send(defaultProducts);
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

app.post("/api/order", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, PRIVATE_KEY)) {
                res.sendStatus(201);
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