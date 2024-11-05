import { db, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from './Firebase';

export const addToCart = async (customerId, item) => {
  const cartRef = doc(db, 'carts', customerId);
  await updateDoc(cartRef, {
    items: arrayUnion(item),
  });
};

export const fetchCart = async (customerId) => {
  const cartRef = doc(db, 'carts', customerId);
  const cartSnap = await getDoc(cartRef);
  return cartSnap.exists() ? cartSnap.data().items : [];
};

export const updateCartItem = async (customerId, itemId, quantity) => {
  const cartRef = doc(db, 'carts', customerId);
  await updateDoc(cartRef, {
    items: arrayUnion({ id: itemId, quantity }),
  });
};

export const removeItem = async (customerId, item) => {
  const cartRef = doc(db, 'carts', customerId);
  await updateDoc(cartRef, {
    items: arrayRemove(item),
  });
};
