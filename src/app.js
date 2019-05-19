const express = require("express");
const app = express();
const path = require('path');

const publicDirPath = path.join(__dirname,'../public')
app.use(express.static(publicDirPath))

app.set("view engine", "hbs")

app.get("/", (req, res) => {
    res.send("<h1> Welcome to world!! <h1>");
})

app.get("/name", (req, res) => {
    res.send({
        name: "MISBAH",
        fname: "ASLAM",
    });
})

app.listen(4040, () => {
    console.log("Server is running . . .  ");
})