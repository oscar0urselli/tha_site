import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
//import cookieParser from 'cookie-parser';
import compression from 'compression';



dotenv.config();

const PORT = process.env.PORT || 3000;

const app: express.Express = express();
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(compression());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.disable('x-powered-by');


app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/home');
});
app.get('/home', (req: express.Request, res: express.Response) => {
    res.render('home', { sectionName: 'Home' });
});

app.get('/projects', (req: express.Request, res: express.Response) => {
    res.render('projects', { sectionName: 'Projects' });
});

app.get('/about', (req: express.Request, res: express.Response) => {
    res.render('about', { sectionName: 'About' });
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
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