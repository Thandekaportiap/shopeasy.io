import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from '../components/Firebase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key

const ProductDetails = ({ customerId }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, 'products', id);
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await addDoc(collection(db, 'carts'), {
                customerId: customerId,
                productId: id,
                productName: product.name,
                price: product.price,
                quantity: quantity
            });
            console.log("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleBuyNow = async () => {
        const stripe = await stripePromise;

        // Create a checkout session on your backend
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: id,
                quantity: quantity,
            }),
        });

        const session = await response.json();

        // Redirect to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="font-sans bg-white">
            <div className="max-w-4xl p-4 mx-auto lg:max-w-7xl">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3">
                        <img src={product.image || 'default-image-url'} alt={product.name} className="object-cover w-full rounded" />
                        <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
                        <p className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <input 
                                type="number" 
                                value={quantity} 
                                min="1" 
                                onChange={(e) => setQuantity(e.target.value)} 
                                className="border rounded p-2 w-20"
                            />
                            <button type="button" onClick={handleBuyNow} className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Buy Now</button>
                            <button type="button" onClick={addToCart} className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
