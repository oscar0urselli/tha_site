CREATE DATABASE tha_site;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    usr VARCHAR(30) NOT NULL,
    psw CHAR(60) NOT NULL,
    cookie VARCHAR(255),
    birthday DATE,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    show_name BOOLEAN DEFAULT FALSE,
    show_email BOOLEAN DEFAULT FALSE,
    show_birthday BOOLEAN DEFAULT FALSE,
    show_usr BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id)
);

/*
Add other fields in users:
- identified gender: Male, Female, Other
- nationality
- first language spoken
- personal website link
- private mode: true, false. True by default
*/