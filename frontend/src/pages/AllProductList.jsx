import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../components/ProductCard1';
import TypewriterEffect from '../components/TypeEffect';

const AllProductsList = () => {
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading products...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    console.log(products)

    return (
       <>
       <TypewriterEffect />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
       </>
    );
};

export default AllProductsList;
