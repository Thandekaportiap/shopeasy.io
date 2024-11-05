const admin = require('firebase-admin');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).json({ uid: userRecord.uid, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.auth().getUserByEmail(email);
        // If needed, you can verify the password here, but for Firebase, you generally handle it on the client side
        const token = await admin.auth().createCustomToken(user.uid);
        res.json({ token });
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
};
