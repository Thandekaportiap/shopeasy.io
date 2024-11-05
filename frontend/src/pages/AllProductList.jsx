import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../components/ProductCard1';
import TypewriterEffect from '../components/TypeEffect';

const AllProductsList = ({ customerId }) => {
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading products...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const onAddToFavorites = (favoriteItem) => {
        // Check if the item is already in favorites
        const isAlreadyFavorited = favorites.some(
          (item) => item.productId === favoriteItem.productId && item.customerId === favoriteItem.customerId
        );
    
        // If not already favorited, add it to the list
        if (!isAlreadyFavorited) {
          setFavorites((prevFavorites) => [...prevFavorites, favoriteItem]);
        }
      };

    console.log(products)

    return (
       <>
       <TypewriterEffect />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}
                customerId={customerId}
                onAddToFavorites={onAddToFavorites} />
            ))}
        </div>
       </>
    );
};

export default AllProductsList;
