import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../components/Firebase';
import { loadStripe } from '@stripe/stripe-js';

const Cart = ({ customerId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [editingItemId, setEditingItemId] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    const stripePromise = loadStripe('pk_test_51QBwYZA9hsbb7bPk3qURxjQEH9qKpNV9wWbVrvqwBdAE9bwscO3RjzcRcrw6RcfGwoClNsqvBCkz2dwxabzRvGCN00TAomN0jY'); // Replace with your Stripe publishable key

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartRef = collection(db, 'carts');
                const q = query(cartRef, where("customerId", "==", customerId));
                const querySnapshot = await getDocs(q);

                let items = [];
                let calculatedTotal = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const itemPrice = Number(data.price);
                    const itemQuantity = Number(data.quantity);
                    
                    items.push({ id: doc.id, ...data, price: itemPrice, quantity: itemQuantity });
                    calculatedTotal += itemPrice * itemQuantity;
                });

                setCartItems(items);
                setTotal(calculatedTotal);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [customerId]);

    const handleEditQuantity = async (itemId) => {
        try {
            const itemRef = doc(db, 'carts', itemId);
            await updateDoc(itemRef, { quantity: newQuantity });

            setCartItems(cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
            setEditingItemId(null);
            recalculateTotal();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteDoc(doc(db, 'carts', itemId));

            setCartItems(cartItems.filter(item => item.id !== itemId));
            recalculateTotal();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const recalculateTotal = () => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    };

    const handleCheckout = async () => {
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
            }
        } catch (error) {
            console.error('Error in handleCheckout:', error);
        }
    };
    
    

    if (loading) return <div>Loading cart...</div>;

    return (
        <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-2">
                            <div>
                                <h3 className="font-semibold">{item.productName}</h3>
                                <p>Price: R{item.price.toFixed(2)}</p>
                                <p>Quantity: 
                                    {editingItemId === item.id ? (
                                        <input
                                            type="number"
                                            value={newQuantity}
                                            min="1"
                                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                                            className="border rounded p-1 w-20"
                                        />
                                    ) : (
                                        item.quantity
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {editingItemId === item.id ? (
                                    <button 
                                        onClick={() => handleEditQuantity(item.id)}
                                        className="px-2 py-1 bg-green-600 text-white rounded">
                                        Save
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setEditingItemId(item.id);
                                            setNewQuantity(item.quantity);
                                        }}
                                        className="px-2 py-1 bg-blue-600 text-white rounded">
                                        Edit
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded">
                                    Delete
                                </button>
                            </div>
                            <p className="font-semibold">Subtotal: R{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="mt-4 text-right">
    <h3 className="text-xl font-bold">Total: R{total.toFixed(2)}</h3>
    <button 
        onClick={handleCheckout} 
        className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded">
        Proceed to Checkout
    </button>
</div>
                </div>
            )}
        </div>
    );
};

export default Cart;
