// @ts-nocheck
require("dotenv").config();

const path = require('path');
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const bodyParser = require("body-parser");

const DEFAULT_PORT = 80;
const PORT = process.env.PORT || DEFAULT_PORT;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { default: jwtDecode } = require("jwt-decode");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./goods.db", (err) => {
    if (err) {
        console.log("Failed to open or create database: " + err)
    } else {
        console.log("Database has been opened or created");
    }
});


const app = express();
app.use(cors());


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
    db.get(`select user.id, fullName, role.title
            from user
            inner join role
            on user.roleId=role.id
            where login = ? and password = ?
            limit 1`, [login, password], (err, row) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (!row) {
                res.sendStatus(401);
            } else {
                const token = jwt.sign({ role: row.role }, PRIVATE_KEY, { expiresIn: 60, subject: String(row.id) });
                res.send({ token, user: { id: row.id, fullName: row.fullName } });
            }
        }
    });
});

const USER_ROLE_ID = 2;
app.post("/api/signup", (req, res) => {
    const { login, password, fullName } = req.body;

    db.get(`select user.id
            from user
            where login = ?
            limit 1`, login, (err, row) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (row) {
                res.sendStatus(409);
            } else {
                db.run(`insert into user (login, password, fullName, roleId) values (?,?,?,?)`, [login, password, fullName, USER_ROLE_ID]);
                res.sendStatus(201);
            }
        }
    });
});

app.get("/api/goods", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, PRIVATE_KEY)) {
                db.all(`select * from product`, (err, rows) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        if (rows) {
                            res.send(rows);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                });
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
                db.run(`insert into [order] (creationUnixTime, userId) values (?,?)`, [+new Date(), jwtDecode(token).sub], function (err) {
                    if (!err) {
                        const productIds = req.body;
                        for (let productId of productIds) {
                            db.run(`insert into productOfOrder (productId, orderId) values (?,?)`, [productId, this.lastID], (err) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }
                            });
                        }
                    } else {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                });
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

app.get("/api/order", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, PRIVATE_KEY)) {
                db.all(`select [order].id as orderId, 
                               [order].creationUnixTime, 
                               SUM(product.priceInCents) as sumInCents,
                               COUNT(product.id) as countOfProducts from [order]
                        inner join productOfOrder
                        on [order].id = productOfOrder.orderId
                        inner join product
                        on productOfOrder.productId = product.id
                        where userId=?
                        group by [order].id`, [jwtDecode(token).sub], (err, rows) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        if (rows) {
                            res.send(rows);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                });
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

app.get("/api/orderProducts/:id", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            if (jwt.verify(token, PRIVATE_KEY)) {
                db.all(`select product.id, product.title, product.priceInCents, product.imageUrl, product.alt from productOfOrder
                        inner join product on productOfOrder.productId = product.id
                        inner join [order] on productOfOrder.orderId = [order].id
                        where [order].userId = ? and productOfOrder.orderId = ?`, [jwtDecode(token).sub, req.params.id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        if (rows) {
                            res.send(rows);
                        } else {
                            res.sendStatus(404);
                        }
                    }
                });
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