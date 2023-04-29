"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const JWT_KEY = (0, uuid_1.v4)();
const MYSQL_URI = process.env.MYSQL_URI || '';
const connMySQL = mysql2_1.default.createConnection(MYSQL_URI);
connMySQL.execute('SHOW TABLES LIKE "projects";', [], (err, rows, fields) => {
    if (err)
        throw err;
    if (rows.length === 0) {
        connMySQL.execute(`CREATE TABLE projects (
            id              INT NOT NULL AUTO_INCREMENT,
            title           VARCHAR(255) NOT NULL,
            description     VARCHAR(255),
            link            VARCHAR(255),
            type            INT NOT NULL,
            PRIMARY KEY (id)
        );`, [], (err, rows, fields) => {
            if (err)
                throw err;
            console.log('Created projects table.');
        });
    }
});
connMySQL.execute('SHOW TABLES LIKE "techs";', [], (err, rows, fields) => {
    if (err)
        throw err;
    if (rows.length === 0) {
        connMySQL.execute(`CREATE TABLE techs (
            id              INT NOT NULL AUTO_INCREMENT,
            name            VARCHAR(255) NOT NULL,
            color           INT NOT NULL,
            PRIMARY KEY (id)
        );`, [], (err, rows, fields) => {
            if (err)
                throw err;
            console.log('Created techs table.');
        });
    }
});
connMySQL.execute('SHOW TABLES LIKE "projects_techs";', [], (err, rows, fields) => {
    if (err)
        throw err;
    if (rows.length === 0) {
        connMySQL.execute(`CREATE TABLE projects_techs (
            id_project      INT,
            id_tech         INT
        );`, [], (err, rows, fields) => {
            if (err)
                throw err;
            console.log('Created projects_techs table.');
        });
    }
});
const app = (0, express_1.default)();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
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
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.get('/projects', (req, res) => {
    res.render('projects', { sectionName: 'Projects' });
});
app.get('/projects/techs', (req, res) => {
    connMySQL.execute('SELECT * FROM techs;', (err, rows, fields) => {
        if (err)
            console.error(err);
        res.send(rows);
    });
});
app.get('/projects/get', (req, res) => {
    connMySQL.execute('SELECT * FROM projects LEFT JOIN projects_techs ON projects.id = projects_techs.id_project;', (err, rows, fields) => {
        if (err)
            console.error(err);
        res.send(rows);
    });
});
app.get('/about', (req, res) => {
    res.render('about', { sectionName: 'About' });
});
app.get('/login', (req, res) => {
    res.render('login', { sectionName: 'Login' });
});
app.post('/login', (req, res) => {
    if (req.body.username === process.env.ADMIN_PANEL_USERNAME && req.body.password === process.env.ADMIN_PANEL_PASSWORD) {
        let cookie = jsonwebtoken_1.default.sign({ user: 'admin' }, JWT_KEY, { expiresIn: 86400 });
        res.cookie('session', cookie, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.send('yes');
    }
    else {
        res.send('no');
    }
});
app.get('/404', (req, res) => {
    res.status(404);
    res.render('404', { sectionName: '404' });
});
app.use((req, res, next) => {
    if (process.env.DEV) {
        next();
        return;
    }
    if (req.cookies.session) {
        jsonwebtoken_1.default.verify(req.cookies.session, JWT_KEY, (err, decoded) => {
            if (err)
                console.error(err);
            if (decoded) {
                next();
            }
            else {
                res.redirect('/404');
            }
        });
    }
    else {
        res.redirect('/404');
    }
});
app.get('/admin', (req, res) => {
    res.render('admin', { sectionName: 'Admin' });
});
app.get('/admin/add-project', (req, res) => {
    res.render('add-project', { sectionName: 'Add project' });
});
app.post('/admin/add-project', (req, res) => {
    connMySQL.execute('INSERT INTO projects (title, description, link, type) VALUES (?, ?, ?, ?);', [req.body.title, req.body.description, req.body.link, req.body.type], (err, rows, fields) => {
        if (err)
            console.error(err);
        req.body.techs.forEach((tech) => {
            connMySQL.execute('INSERT INTO projects_techs (id_project, id_tech) VALUES (?, ?);', [rows.insertId, tech], (err, rows, fields) => {
                if (err)
                    console.error(err);
            });
        });
    });
    res.send('ok');
});
app.post('/admin/del-project', (req, res) => {
    connMySQL.execute('DELETE projects, projects_techs FROM projects LEFT JOIN projects_techs ON projects.id = projects_techs.id_project WHERE projects.id = ?;', [req.body.id], (err, rows, fields) => {
        if (err)
            console.error(err);
    });
    res.send('ok');
});
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
process.on('SIGTERM', () => {
    server.close(() => {
        console.warn('HTTP server closed.');
        connMySQL.end((err) => {
            if (err)
                throw err;
            console.warn('MySQL connection closed.');
        });
    });
});
process.on('SIGINT', () => {
    server.close(() => {
        console.warn('HTTP server closed.');
        connMySQL.end((err) => {
            if (err)
                throw err;
            console.warn('MySQL connection closed.');
        });
    });
});
