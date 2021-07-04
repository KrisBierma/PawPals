-- Drop table if exists animals;
-- DROP TABLE IF EXISTS breeds;
-- DROP TABLE IF EXISTS types;

CREATE TABLE IF NOT EXISTS breeds(
  id INT GENERATED ALWAYS AS IDENTITY,
  breed varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS types(
  id INT GENERATED ALWAYS AS IDENTITY,
  aType varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS animals(
  id INT GENERATED ALWAYS AS IDENTITY,
  aName VARCHAR(256),
  gender INT NOT NULL,
  aDescription VARCHAR,
  breedID INT not null,
  aTypeID INT not null,
  primary key (id),
  CONSTRAINT breedFK FOREIGN KEY(breedID) REFERENCES breeds(id),
  CONSTRAINT aTypeFK FOREIGN KEY(aTypeID) REFERENCES types(id)
);
