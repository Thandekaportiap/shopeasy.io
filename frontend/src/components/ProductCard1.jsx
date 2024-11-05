import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard1 = ({ product, customerId, onAddToFavorites }) => {
  // State to track if the product is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // Handle favorite click
  const handleFavoriteClick = () => {
    if (!isFavorited) {
      // Add item to favorites
      onAddToFavorites({ productId: product.id, customerId });
      setIsFavorited(true);
    }
  };

  return (
    <div className="bg-[#eed6d3] rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden">
      <div className="p-6">
        <div
          onClick={handleFavoriteClick}
          className={`absolute flex items-center justify-center w-10 h-10 rounded-full cursor-pointer top-4 right-4 ${
            isFavorited ? 'bg-red-100' : 'bg-gray-100'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            className={`inline-block ${isFavorited ? 'fill-red-600' : 'fill-gray-800'}`}
            viewBox="0 0 64 64"
          >
            <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
          </svg>
        </div>
        <Link to={`/product/${product.id}`}>
          <div className="flex gap-2 mt-2">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`Product ${index}`} className="object-cover w-20 h-20" />
            ))}
          </div>
        </Link>
      </div>
      <div className="p-6 text-center bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-[#67595e]">{product.name}</h3>
        </Link>
        <h4 className="text-lg text-[#67595e] font-bold mt-6">
          R{product.price} <strike className="ml-2 font-medium text-gray-400">{product.originalPrice}</strike>
        </h4>
        <button
          type="button"
          className="flex items-center justify-center w-full gap-3 px-6 py-3 mt-6 text-base font-semibold text-gray-800 bg-yellow-400 rounded-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"></path>
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard1;
