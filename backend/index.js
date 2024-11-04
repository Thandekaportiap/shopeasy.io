import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe('sk_test_51QBwYZA9hsbb7bPkozoWMsztepZqXfX5AdK4VvuErx9jSWUer0ojxe5IelRakrJw6PRWO9NnsrsCiLSkBWbylJez00jOXPQH6d');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'zar', // Change to your currency
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent: ", error); // Log error if it fails
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});