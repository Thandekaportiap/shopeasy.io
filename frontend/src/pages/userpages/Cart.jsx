import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCart, addItemToCart, updateItemQuantity, removeItemFromCart } from '../../Features/cart/CartSlice';

const Cart = ({ customerId }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (customerId) {
      console.log("Fetching cart for customer:", customerId);
      dispatch(fetchUserCart(customerId));
    }
  }, [customerId, dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ customerId, item }));
    // Consider whether you want to fetch the cart again after adding an item
    // dispatch(fetchUserCart(customerId)); 
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) return; // Prevent negative quantity
    dispatch(updateItemQuantity({ customerId, itemId, quantity }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart({ customerId, itemId: item.id }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error fetching cart items: {error}</div>;
  if (!items || items.length === 0) return <div>No items in cart.</div>;

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />
          <div className="space-y-4">
          {items.map((item) => (
  <div key={item.productId} className="grid grid-cols-3 items-center gap-4">
    <div className="col-span-2 flex items-center gap-4">
      <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
        {/* Assuming you have an image field, otherwise replace accordingly */}
        <img src={item.image || 'placeholder_image_url'} className="w-full h-full object-contain" alt={item.productName} />
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-800">{item.productName}</h3>
        <h6
          className="text-xs text-red-500 cursor-pointer mt-0.5"
          onClick={() => handleRemoveItem(item)}
        >
          Remove
        </h6>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
            className="border p-1 rounded hover:bg-gray-200"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
            className="border p-1 rounded hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div className="ml-auto">
      <h4 className="text-base font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h4>
    </div>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
