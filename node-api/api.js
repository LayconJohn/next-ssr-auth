const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "SecretKey";

app.use(bodyParser.json());

//routes
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "Admin") {
        const token = jwt.sign({username}, secretKey, {expiresIn: "2h"});
        res.json({ token });
    } else {
        res.status(401).json({ error: "Failed to Authentication" });
    }
})

//middleware
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ error: "token not provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(401).json({ error: "Failed to authenticate token" });
        }

        req.user(decoded);
        next();
    });
}

const port = 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});