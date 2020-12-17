//node modules
const express = require("express");
const path = require("path");
const fs = require("fs");
//calling express
const app = express();
//creating port for server
const PORT = process.env.PORT || 3001;
//const keyDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(savedNotes[Number(req.params.id)]);
});
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = req.body;
    let specialID = (savedNotes.length).toString();
    newNote.id = specialID;
    savedNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) =>{
        if(err) throw err ;
        res.json("succes!");
    })
});
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes =JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`delete note ${noteId}`);
    savedNotes = savedNotes.filter(thisNote => {
        return thisNote.id  != noteId;
    })

    for (thisNote of savedNotes) {
        thisNote.id = newId.toString()
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
app.get("/", function(req, res) {
    res.json(path.join(__dirname, "./public/index.html"));
  });
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.listen(PORT, () => console.log(`serve is good on port ${PORT}`));