import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from '../components/Firebase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QBwYZA9hsbb7bPk3qURxjQEH9qKpNV9wWbVrvqwBdAE9bwscO3RjzcRcrw6RcfGwoClNsqvBCkz2dwxabzRvGCN00TAomN0jY'); // Replace with your Stripe publishable key

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
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await fetch('https://shopeasy-io-2.onrender.com/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        productName: item.productName,
                        price: item.price,
                        quantity: item.quantity,
                    }))
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }
    
            const session = await response.json();
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({ sessionId: session.id });
    
            if (result.error) {
                console.error('Stripe checkout error:', result.error.message);
            } else {
                // Once payment is successful, create order and clear the cart
                createOrder();
            }
        } catch (error) {
            console.error('Error in handleCheckout:', error);
        }
    };
    

    if (!product) return <div>Loading...</div>;

    console.log(product)

    return (
        <div className="font-sans bg-white">
            <div className="max-w-4xl p-4 mx-auto lg:max-w-7xl">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md shadow-[#eed6d3] p-6 rounded-lg">
                    <div className="lg:col-span-3">
                        <img src={product.images || 'default-image-url'} alt={product.name} className="object-cover rounded" />
                        <h2 className="text-2xl font-extrabold text-gray-800 my-4">{product.name}</h2>

                        <h4 className="text-2xl font-extrabold text-[#67595e] my-4">{product.description}</h4>
                        
                        <p className="text-3xl font-bold text-gray-800">
    R{product.price ? Number(product.price).toFixed(2) : '0.00'}
</p>

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
