import { db, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from './Firebase';

// Function to add an item to the cart
export const addToCart = async (customerId, item) => {
  const cartRef = doc(db, 'carts', customerId);
  await updateDoc(cartRef, {
    items: arrayUnion({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1 // Default quantity for new item
    }),
  });
};

// Function to fetch the cart items for a customer
export const fetchCart = async (customerId) => {
    const cartRef = doc(db, 'carts', customerId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
        return cartDoc.data().items || []; // Return the items array
    } else {
        console.error('No cart found for this customer ID:', customerId);
        return []; // Return an empty array if no cart is found
    }
};

// Function to update the quantity of an item in the cart
export const updateCartItem = async (customerId, itemId, quantity) => {
  const cartRef = doc(db, 'carts', customerId);
  
  // To update the quantity, you may need to replace the item
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    const items = cartDoc.data().items;
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );

    await updateDoc(cartRef, {
      items: updatedItems,
    });
  }
};

// Function to remove an item from the cart
export const removeItem = async (customerId, itemId) => {
  const cartRef = doc(db, 'carts', customerId);
  const cartDoc = await getDoc(cartRef);

  if (cartDoc.exists()) {
    const items = cartDoc.data().items;
    const updatedItems = items.filter(item => item.id !== itemId);

    await updateDoc(cartRef, {
      items: updatedItems,
    });
  } else {
    console.error('No cart found for this customer ID:', customerId);
  }
};
