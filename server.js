// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db');

// set up express
var app = express();
var PORT = process.env.PORT || 3001;

// link to public assets
app.use(express.static('public'));

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// on page load index.html and listen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// for landing on notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// set up routes here instead
app.route('/api/notes')
    // grab notes list
    .get((req, res) => {
        res.json(database);
    })

    // adds new note to DB
    .post((req, res) => {
        let jsonFilePath = path.join(__dirname, '/db/db.json');
        let newNote = req.body;

        let topId = 99;
        // loops through array and finds highest
        for (let i = 0; i < database.length; i++) {
            let note = database[i];

            if (note.id > topId) {
                topId = note.id;
            };
        };

        // assign id to newNote
        newNote.id = topId + 1;
        // push to db
        database.push(newNote);

        // rewrite db.json file
        fs.writeFile(jsonFilePath, JSON.stringify(database), (err) => {
            if (err) {
                return err;
            };
            console.log('YOUR NOTE IS SAVED!');
        });
        res.json(newNote);
    });

    // delete
    app.delete('/api/notes/:id', (req, res) => {
        let jsonFilePath = path.join(__dirname, '/db/db.json');
        // req to delete by id
        for (let i = 0; i < database.length; i++) {
            if (database[i].id === req.params.id) {
                database.splice(i, 1);
                break;
            };
        };

        // rewrite db.json file
        fs.writeFileSync(jsonFilePath, JSON.stringify(database), (err) => {
            if (err) {
                return err;
            } else {
                console.log('YOUR NOTE IS DELETED!');
            }
        });
        res.json(database);
    });

    // sets up server
    app.listen(PORT, () => {
        console.log('App listening on PORT:',PORT);
    });