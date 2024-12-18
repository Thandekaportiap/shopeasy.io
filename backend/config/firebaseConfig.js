const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Path to your service account key


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-name.firebaseio.com" // Replace with your database URL
});

const db = admin.firestore();

module.exports = db;
