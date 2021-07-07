const animalsQ = {
  getAll : 'SELECT * FROM animals;'
};

const usersQ = {
  getFavs : 'select an.id, an.aname, an.gender, an.adescription, b.breed, t.id, t.atype, av.id, av.availability from favorites f inner join animals an on f.animalID = an.id inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id where userID = $1'
};

module.exports = { animalsQ, usersQ };
