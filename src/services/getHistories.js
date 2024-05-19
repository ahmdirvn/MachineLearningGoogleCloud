const { Firestore } = require('@google-cloud/firestore');

// membbuat fungsi untuk mengambil semua data hasil prediksi
async function getHistories() {
    const db = new Firestore({
      projectId: 'submissionmlgc-ahmadirvan',
      keyFilename: './application_default_credentials.json',
    });
  
    const predictCollection = db.collection('prediction');
  
    const histories = [];
    try {
      const snapshot = await predictCollection.get();
      snapshot.forEach(doc => {
        histories.push(doc.data());
      });
      return histories;
    } catch (error) {
      console.error(`Error getting data: ${error.message}`);
      throw error; // Rethrow the error after logging it
    }
  }

module.exports = getHistories;