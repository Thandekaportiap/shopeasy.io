import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByAdminId } from '../../Features/Product/ProductSlice';
import ProductCard from '../../components/ProductCard';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../components/Firebase'; 
import { Link } from 'react-router-dom';


const ManageProductsList = ({ adminId }) => {
    const dispatch = useDispatch();
    const { items: products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsByAdminId(adminId));
    }, [dispatch, adminId]);

  

    if (status === 'loading') return <p>Loading products...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}  />
            ))}
          <Link to="/addproduct">  <button className='py-2 px-4 bg-blue-500 text-white rounded-md'>Add Product</button></Link>
        </div>
    );
};

export default ManageProductsList;
