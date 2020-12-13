//node modules
const express = require("express");
const path = require("path");
const fs = require("fs");
//calling express
const app = express();
//creating port for server
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendfile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "/db/db.json"))
});
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs,fs.readFileSync("./db/db.json", "utf-8"));
    res.json(savedNotes[Number(req.params.id)]);
});


app.listen(PORT, () => console.log(`serve is good on port ${PORT}`));