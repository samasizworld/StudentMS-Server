CREATE DATABASE sms;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- We have made database asper as models
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
    studentsubjectid serial ,
    guid UUID DEFAULT uuid_generate_v1(),
    datecreated TIMESTAMP DEFAULT now(),
    datemodified TIMESTAMP,
    datedeleted TIMESTAMP,
    "studentid" INT REFERENCES students (studentid) ,
    "subjectid" INT REFERENCES subjects (subjectid) ,
    UNIQUE(studentid,subjectid),
    PRIMARY KEY (studentsubjectid)
);

/*Extra SQL functions*/
ALTER TABLE studentsubjects
    ADD studentid INT REFERENCES students (studentid);

ALTER TABLE studentsubjects
    ADD subjectid INT REFERENCES subjects (subjectid);
/* Not working with serial*/
ALTER TABLE students 
    ALTER COLUMN studentid TYPE serial;

-- function
-- CREATE OR REPLACE FUNCTION update_association()
--   RETURNS TRIGGER 
--   LANGUAGE PLPGSQL
--   AS
-- $$
-- BEGIN
-- 	UPDATE studentsubjects SET datedeleted=now() ;

-- END;
-- $$

-- CREATE TRIGGER updt_log
--   AFTER UPDATE 
--   ON students
--   FOR EACH ROW
--   EXECUTE PROCEDURE update_association();
