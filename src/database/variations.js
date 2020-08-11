const { getDatabase } = require('./mongo-common');
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const { ObjectID } = require('mongodb');
var getUserName = require('git-user-name');
// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = 'variations';
async function createVariation(variation) {
  const database = await getDatabase();
  variation.addedBy = getUserName()
  // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
  const { insertedId } = await database.collection(collectionName).insertOne(variation);
  return insertedId;
}
async function getVariations() {
  const database = await getDatabase();
  // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
  return await database.collection(collectionName).find({}).toArray();
}
async function deleteVariation(id) {
  const database = await getDatabase();
  // https://docs.mongodb.com/manual/reference/method/ObjectId/
  // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}