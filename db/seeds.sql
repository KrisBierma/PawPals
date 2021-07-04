-- non-static data that will start the db; can be deleted
-- gender male=1, female=2
INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID)
VALUES
('Jack', 1, 'Loveable four-year-old. Slightly skittish but cuddly and soft. Loves to play fetch with his mouse and have his belly rubbed. (Yes, he is a cat!)', 2, 2),
('Sammy', 2, 'Super chill and relaxed. Curious and friendly with visitors. Will sit and stare at you with intensity if you forget to feed her.', 3, 2);