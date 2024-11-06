// In your server file (e.g., server.js)
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

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
            success_url: `http://localhost:5173/success`, // Correct URL
            cancel_url: `http://localhost:5173/cancel`,  // Correct URL
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
