const animalsQ = {
  getAll : 'SELECT * FROM animals;',
  getAllWiFav: 'select fav.userid as favUserID, an.id as animalID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id as typeID, t.atype, av.id as availabilityID, av.availability from animals an inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id left join (select * from favorites f where f.userID=$1) fav on an.id = fav.animalID;'
};

const newsQ = {
  addNewsAnimal : 'INSERT INTO newsItems(newsItemTypeID, animalID) VALUES ($1, $2);',
  addNewsEvent : 'INSERT INTO newsItems(newsItemTypeID, aDescription, eventDate) VALUES($1, $2, $3);',
  addNewsNews : 'INSERT INTO newsItems(newsItemTypeID, aDescription) VALUES ($1, $2);',
  deleteNews : 'DELETE FROM newsitems WHERE id = $1;',
  getNews : 'SELECT n.id as newsItemId, nt.newsItemType, n.eventDate, n.aDescription, n.animalID, an.aName, an.imageURL FROM newsitems n JOIN newsItemTypes nt on n.newsItemTypeId = nt.id LEFT JOIN animals an on n.animalID = an.id;'
};

const usersQ = {
  getFavs : 'select an.id, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id, t.atype, av.id, av.availability from favorites f inner join animals an on f.animalID = an.id inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id where userID = $1',
  addFav : 'INSERT INTO favorites(animalID, userID) VALUES ($1, $2);',
  deleteFav : 'DELETE FROM favorites WHERE animalID = $1 and userID = $2;'
};



module.exports = { animalsQ, newsQ, usersQ };
