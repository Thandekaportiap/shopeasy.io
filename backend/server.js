
// In your server file (e.g., server.js)
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const stripe = new Stripe('sk_test_51QBwYZA9hsbb7bPkozoWMsztepZqXfX5AdK4VvuErx9jSWUer0ojxe5IelRakrJw6PRWO9NnsrsCiLSkBWbylJez00jOXPQH6d'); 

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { items } = req.body; // items should be an array with item { productName, quantity, price }

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'zar', // Change currency to ZAR (South African Rand)
                product_data: {
                    name: item.productName,
                },
                unit_amount: item.price * 100, // Amount in cents (ZAR)
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `https://shopeasy-io.onrender.com/success`, // Correct URL
            cancel_url: `https://shopeasy-io.onrender.com/cancel`,  // Correct URL
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



















// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
