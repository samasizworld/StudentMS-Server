CREATE DATABASE sms;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE students( 
    studentid serial,
    guid UUID DEFAULT uuid_generate_v1(),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    address VARCHAR(255),
    datecreated TIMESTAMP DEFAULT now(),
    datemodified TIMESTAMP,
    datedeleted TIMESTAMP,
    PRIMARY KEY (studentid)
);
CREATE TABLE subjects(
    subjectid serial,
    guid UUID DEFAULT uuid_generate_v1(),
    subjectname VARCHAR(100),
    subjectcode VARCHAR(50),
    datecreated TIMESTAMP DEFAULT now(),
    datemodified TIMESTAMP,
    datedeleted TIMESTAMP,
    PRIMARY KEY(subjectid)
);

CREATE TABLE studentsubjects(
    studentsubjectid serial PRIMARY KEY,
    guid UUID DEFAULT uuid_generate_v1(),
    datecreated TIMESTAMP DEFAULT now(),
    datemodified TIMESTAMP,
    datedeleted TIMESTAMP,
    studentid INT REFERENCES students (studentid),
    subjectid INT REFERENCES subjects (subjectid)

);

/*Extra SQL functions*/
ALTER TABLE studentsubjects
    ADD studentid INT REFERENCES students (studentid);

ALTER TABLE studentsubjects
    ADD subjectid INT REFERENCES subjects (subjectid);
/* Not working with serial*/
ALTER TABLE students 
    ALTER COLUMN studentid TYPE serial;