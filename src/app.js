const express = require("express");
const app = express();
const path = require('path');
const hbs = require("hbs");
const request = require("request");

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))


app.set("view engine", "hbs")

const viewFolderPath = path.join(__dirname, '../templates/views')
app.set("views", viewFolderPath)


const partialsFolderPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsFolderPath)

/* app.get("/", (req, res) => {
    res.send("<h1> Welcome to world!! <h1>");
}) */

/* app.get("/", (req, res) => {
    res.render("index");
}) */

/* app.get("/", (req, res) => {
    res.render("index", {
        title: "ExpressJS",
        course: "MERN",
        teacher: "Sir Aamir Pinger"
    });
}) */

/* app.get("/", (req, res) => {
    console.log(req.query);
    res.render("index");
}) */

/* app.get("/", (req, res) => {
    if(!req.query.teacher){
        console.log("no teacher found")
    }
    else if(!req.query.course){
        console.log("course no found")
    }
    else{
        const {teacher, course} = req.query;
        res.render("index", {
            teacher,
            course,
            title: "Axiom"
        })
    }
}) */

app.get("/", (req, res) => {
    if (!req.query.teacher) {
        return res.send({ error: "Teacher not found" })
    }
    else if (!req.query.course) {
        return res.send({ error: "Course not found" })
    }
    else {
        const { teacher, course } = req.query;
        res.render("index", {
            teacher,
            course,
            title: "Axiom"
        })
    }
}) 

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/name", (req, res) => {
    res.send({
        name: "MISBAH",
        fname: "ASLAM",
    });
})

app.get("/search", (req, res) => {
    const { word } = req.query;
    if (!word) {
        return res.send({ error: "Word not found!" });
    }
    else {
        const options = {
            url: "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + word,
            headers: {
                "Accept": "application/json",
                "app_id": "b10ab0a8",
                "app_key": "d33481908673b5cb02fb493e846e4fb1"
            }
        }
        request(options, (error, response) => {
            if (response) {
                if (response.statusCode === 200) {
                    const data = response.body;
                    const parsedData = JSON.parse(data)
                    const def = parsedData.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                    return res.send({
                        word, 
                        def
                    })
                }
                else if (response.statusCode === undefined) {
                    return res.send({error: "status code undefined!"})
                }
                else if (response.statusCode === 404) {
                    return res.send({error:`404 Not Found,No entry available for '${word}'.`})
                }
            }
            else {
                return res.send(error)
            }
        })
    }
})


app.listen(4040, () => {
    console.log("Server is running . . .  ");
})