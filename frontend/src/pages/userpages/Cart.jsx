import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCart, addItemToCart, updateItemQuantity, removeItemFromCart } from '../../Features/cart/CartSlice';

const Cart = ({ customerId }) => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.cart);

    useEffect(() => {
        if (customerId) {
            dispatch(fetchUserCart(customerId));
        }
    }, [customerId, dispatch]);

    const handleAddToCart = (item) => {
        dispatch(addItemToCart({ customerId, item }));
    };

    const handleUpdateQuantity = (itemId, quantity) => {
        if (quantity < 1) return; // Prevent negative quantity
        dispatch(updateItemQuantity({ customerId, itemId, quantity }));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItemFromCart({ customerId, itemId: item.productId }));
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'error') return <div>Error fetching cart items: {error}</div>;
    if (!items || items.length === 0) return <div>No items in cart.</div>;

    return (
        <div className="font-sans md:max-w-4xl mx-auto bg-white py-4">
            <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={item.image || 'placeholder_image_url'} className="w-24 h-24 object-cover" alt={item.productName} />
                            <div className="ml-4">
                                <h3 className="font-bold">{item.productName}</h3>
                                <div className="flex items-center mt-2">
                                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                            </div>
                        </div>
                        <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
