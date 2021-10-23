/*
 Author: Tadhg Boyle
 Your name and student #: A01211012
 (Make sure you also specify on the Google Doc)
*/
const express = require('express');
const fs = require('fs');

let MOVIES = [
    'Inception',
    'Spider Man',
    'The Dark Night',
    'Tenet',
];

const NAME = 'Tadhg';

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index', {
        name: NAME,
        movies: MOVIES,
    });
});

app.get('/myForm', (req, res) => res.render('pages/myForm'));

app.post('/myForm', (req, res) => {

    MOVIES = req.body.movies.split(',');

    res.render('pages/index', {
        name: NAME,
        movies: MOVIES,
    });
});

app.get('/myListQueryString', (req, res) => {
    MOVIES = [req.query.movie1, req.query.movie2];

    res.redirect('/');
});

app.get('/search/:movieName', (req, res) => {
    const movieName = req.params.movieName;

    fs.readFile('movieDescriptions.txt', 'utf-8', (err, content) => {
        if (err) {
            return;
        }

        for (line of content.split('\n')) {

            const movieTitle = line.split(':')[0];
            const description = line.split(':')[1];

            if (description.includes(movieName)) {
                return res.render('pages/searchResult', {
                    found: true,
                    movieTitle: movieTitle,
                    description: description,
                });
            }
        }

        res.render('pages/searchResult', {
            found: false,
        });
    });
});

app.listen(3000, () => {
    console.clear()
    console.log('Server is running on http://localhost:3000 🚀');
});