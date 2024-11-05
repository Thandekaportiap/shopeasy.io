import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase'; // Adjust the import based on your Firebase config path

const ProductCard = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Update state with new form values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    // Edit product function
    const handleEditProduct = async () => {
        const productRef = doc(db, 'products', product.id);
        try {
            await updateDoc(productRef, updatedProduct);
            console.log('Product updated successfully');
            handleCloseModal(); // Close modal on success
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete product function
    const handleDeleteProduct = async () => {
        const productRef = doc(db, 'products', product.id);
        try {
            await deleteDoc(productRef);
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="relative border rounded-lg shadow-md p-4 overflow-hidden min-h-[200px]">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-pink-500 animate-rotate"></div>

    <div className="absolute inset-1 bg-white rounded-lg shadow-md h-full p-4 flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-semibold">Price: R{product.price}</p>
            <div className="flex gap-2 mt-2">
                {product.images.map((img, index) => (
                    <img key={index} src={img} alt={`Product ${index}`} className="w-20 h-20 object-cover rounded" />
                ))}
            </div>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="flex mt-4 space-x-4">
            <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                Edit
            </button>
            <button onClick={handleDeleteProduct} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
                Delete
            </button>
        </div>
    </div>


            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                        <form>
                            <label className="block mb-2">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={handleInputChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={updatedProduct.description}
                                    onChange={handleInputChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={updatedProduct.price}
                                    onChange={handleInputChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </label>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleEditProduct}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
