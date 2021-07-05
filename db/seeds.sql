-- THIS FILE NEEDS DEBUGGGING, DO NOT RUN!!!!!!!!!!!!!!!


-- non-static data that will start the db; can be deleted
-- gender male=1, female=2
-- be careful in seeds to choose type/breed that doesn't conflict bc there's no check to make sure they agree
INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID, availablityID)
VALUES
('Jack', 1, 'Loveable four-year-old. Slightly skittish but cuddly and soft. Loves to play fetch with his mouse and have his belly rubbed. (Yes, he is a cat!)', 10, 2, 4),
('Sammy', 2, 'Super chill and relaxed. Curious and friendly with visitors. Will sit and stare at you with intensity if you forget to feed her.', 11, 2, 4);

INSERT INTO animalDispositions(animalID, dispositionID)
VALUES
(1, 2);

-- ('Animal Joined', 'Event', 'News');
INSERT INTO newsItems(newsItemTypeID, aDescription, eventDate)
VALUES
(2, 'Grand opening!', 2021-07-07 04:05:06);

INSERT INTO newsItems(newsItemTypeID, animalID)
VALUES
(1, 1);

INSERT INTO newsItems(newsItemTypeID, aDescription)
VALUES
(3, 'We have lots of super cute animals waiting for their forever home.');
