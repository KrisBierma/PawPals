const animalsQ = {
  getAll : 'SELECT * FROM animals;',
  getAllWiFav: 'select fav.userid as favUserID, an.id as animalID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id as typeID, t.atype, av.id as availabilityID, av.availability from animals an inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id left join (select * from favorites f where f.userID=$1) fav on an.id = fav.animalID;'
};



const usersQ = {
  getFavs : 'select an.id, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id, t.atype, av.id, av.availability from favorites f inner join animals an on f.animalID = an.id inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id where userID = $1',
  addFav : 'INSERT INTO favorites(animalID, userID) VALUES ($1, $2);',
  deleteFav : 'DELETE FROM favorites WHERE animalID = $1 and userID = $2;'
};

module.exports = { animalsQ, usersQ };
