const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const SecretKey = "secretkey"

app.get("/", (req, res) => {
    res.json({
        message: "a simple api"
    })
})
const varifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next()
    } else {
        res.send({
            result: "Token not valid!"
        })
    }
}

app.post("/profile", varifyToken, (req, res) => {
    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (err) {
            res.json({
                message: "Invalid token!"
            })
        } else {
            res.json({
                message: "Profile Access!",
                data: authData
            })
        }
    })
})


app.post('/login', (req, res) => {
    const user = {
        id: 1,
        name: "Pratiksha",
        email: 'ppl@narola.email'
    }
    jwt.sign({ user }, SecretKey, { expiresIn: '300s' }, (err, token) => {
        res.json({
            token
        })
    })
})

app.listen(5000, () => {
    console.log("app is runnig on 500")
})