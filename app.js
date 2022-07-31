const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');



dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


app.get('/', (req, res) => {
    res.redirect('/home');
});
app.get('/home', (req, res) => {
    res.render('home', { sectionName: 'Home' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { sectionName: 'Projects' });
});

app.get('/about', (req, res) => {
    res.render('about', { sectionName: 'About' });
});


process.on('SIGTERM', () => {
    server.close(() => {
        console.warn('HTTP server clodes.');
    });
});
process.on('SIGINT', () => {
    server.close(() => {
        console.warn('HTTP server clodes.');
    });
});