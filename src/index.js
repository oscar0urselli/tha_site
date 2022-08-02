"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//import cookieParser from 'cookie-parser';
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use((0, compression_1.default)());
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.disable('x-powered-by');
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
app.use((req, res, next) => {
    res.status(404);
    res.render('404', { sectionName: '404' });
});
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
process.on('SIGTERM', () => {
    server.close(() => {
        console.warn('HTTP server closed.');
    });
});
process.on('SIGINT', () => {
    server.close(() => {
        console.warn('HTTP server closed.');
    });
});
