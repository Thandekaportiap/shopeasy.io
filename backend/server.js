const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Firestore database reference
const db = admin.firestore();

// User registration
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().createUser({ email, password });
        res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Product routes
app.use('/api/products', require('./routes/products')(db));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
