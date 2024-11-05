import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, } from "firebase/firestore";
import { db } from '../components/Firebase';

const ProductDetails = ({customerId}) => {
    console.log(customerId)
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product data by ID from Firestore
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, 'products', id); // Assuming 'products' is your collection name
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await addDoc(collection(db, 'carts'), {
                customerId: customerId,
                productId: id,
                productName: product.name,
                price: product.price,
                quantity: 1 // Adjust quantity as needed
            });
            console.log("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

   

    if (!product) return <div>Loading...</div>;

    return (
        <div className="font-sans bg-white">
            <div className="max-w-4xl p-4 mx-auto lg:max-w-7xl">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="top-0 w-full text-center lg:col-span-3 lg:sticky">
                        <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={product.image || 'default-image-url'} alt={product.name || 'Product Image'} className="object-cover w-3/4 mx-auto rounded" />
                            <button type="button" className="absolute top-4 right-4">
                                {/* SVG Icon */}
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mx-auto mt-6">
                            {(product.additionalImages || []).map((img, index) => (
                                <div key={index} className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer">
                                    <img src={img} alt={`Product${index + 1}`} className="w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">{product.name || 'Product Name'}</h2>
                        <div className="flex mt-4 space-x-2">
                            {/* Rating SVG */}
                            <h4 className="text-base text-gray-800">{product.reviews || 'No reviews'} Reviews</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className="text-3xl font-bold text-gray-800">${product.price || '0.00'}</p>
                            <p className="text-base text-gray-400"><strike>${product.oldPrice || ''}</strike> <span className="ml-1 text-sm">Tax included</span></p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800">Choose a Color</h3>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {(product.colors || []).map((color, index) => (
                                    <button key={index} type="button" className={`w-10 h-10 ${color.className} border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all`}></button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button type="button" className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Buy now</button>
                              <button 
                                type="button" 
                                onClick={addToCart} 
                                className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-xl font-bold text-gray-800">Product information</h3>
                    <ul className="mt-4 space-y-6 text-gray-800">
                        {product.info && Object.entries(product.info).map(([key, value]) => (
                            <li className="text-sm" key={key}>{key} <span className="float-right ml-4">{value}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
