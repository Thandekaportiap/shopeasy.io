import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCart, addItemToCart, updateItemQuantity, removeItemFromCart } from '../../Features/cart/CartSlice';

const Cart = ({ customerId }) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);

  useEffect(() => {
    if (customerId) {
      console.log("Fetching cart for customer:", customerId);
      dispatch(fetchUserCart(customerId));
    }
  }, [customerId, dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ customerId, item }));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateItemQuantity({ customerId, itemId, quantity }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart({ customerId, item }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!items || items.length === 0) return <div>No items in cart.</div>;

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                    <h6
                      className="text-xs text-red-500 cursor-pointer mt-0.5"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </h6>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-800">${item.price * item.quantity}</h4>
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
