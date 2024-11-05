const db = require('../config/firebaseConfig');

exports.getAllProducts = async (req, res) => {
    try {
        const snapshot = await db.collection('products').where('isVisible', '==', true).get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const productDoc = await db.collection('products').doc(id).get();
        if (!productDoc.exists) return res.status(404).json({ message: 'Product not found' });
        res.json({ id: productDoc.id, ...productDoc.data() });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

exports.addProduct = async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const productRef = await db.collection('products').add({ name, description, price, image, isVisible: true });
        res.status(201).json({ id: productRef.id, name, description, price, image });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        await db.collection('products').doc(id).update(updateData);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await db.collection('products').doc(id).delete();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

exports.hideProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await db.collection('products').doc(id).update({ isVisible: false });
        res.json({ message: 'Product hidden successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error hiding product', error });
    }
};
