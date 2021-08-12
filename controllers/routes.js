// const fs = require('fs');
// const path = require('path');

// module.exports = app => {
//     // sets up notes variable
    
//     fs.readFile('db/db.json','utf8', (err, data) => {
        
//         if (data) {
//             var notes = JSON.parse(data);

//             // sets up api/notes to get route
//             app.get('/api/notes', (req, res) => {
//                 // read the db.JSON file and return saved notes
//                 res.JSON(notes);
//             });

//             // sets up api/notes to post route
//             app.post('/api/notes', (req, res) => {
//                 // receive new note, add to db.JSON, return new note
//                 let newNote = req.body;
//                 notes.push(newNote);
//                 updateDb();
//                 return console.log('Added New Note:',newNote.title);
//             });

//             // retrieve note with specific id
//             app.get('/api/notes/:id', (req, res) => {
//                 // displays JSON for the notes array indices of id
//                 res.JSON(notes[req.params.id]);
//             });

//             // deletes note with specific id
//             app.delete('/api/notes/:id', (req, res) => {
//                 notes.splice(req.params.id, 1);
//                 updateDb();
//                 console.log('Deleted Note with ID:',req.params.id);
//             });

//             // displays notes.html when user hits /notes
//             app.get('/notes', (req, res) => {
//                 res.sendFile(path.join(__dirname, '../public/notes.html'));
//             });

//             // displays index.html when all other routes accessed
//             app.get('*', (req, res) => {
//                 res.sendFile(path.join(__dirname, '../public/index.html'));
//             });

//             // function helper to update JSON file whenever note added or deleted
//             let updateDb = () => {
//                 fs.writeFile('db/db.json',JSON.stringify(notes,'\t'), err => {
//                     if (true) {
//                         return true;
//                     } else {
//                         throw err;
//                     }
//                 })
//             }
//         } else {
//             throw err;
//         };
//     });
// }