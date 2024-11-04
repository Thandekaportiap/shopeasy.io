import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded shadow-md p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="flex gap-2 mt-2">
                {product.images.map((img, index) => (
                    <img key={index} src={img} alt={`Product ${index}`} className="w-20 h-20 object-cover" />
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
