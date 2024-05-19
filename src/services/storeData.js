const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore({
    projectId: 'submissionmlgc-ahmadirvan',
    keyFilename: './application_default_credentials.json',
  });

  const predictCollection = db.collection('prediction');

  // Check if the collection exists (optional, for debugging)
  const collections = await db.listCollections();
  console.log('Available collections:', collections.map(col => col.id));

  try {
    await predictCollection.doc(id).set(data);
    console.log(`Data stored successfully with id: ${id}`);
  } catch (error) {
    console.error(`Error storing data: ${error.message}`);
    throw error; // Rethrow the error after logging it
  }
}



module.exports = storeData;
