import React, { useState } from 'react';
import { db } from '../../components/Firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AddProduct = ({ adminId }) => {  // Accept adminId as a prop
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const base64Images = [];
        const previews = [];

        files.forEach((file) => {
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    base64Images.push(reader.result);
                    previews.push(reader.result);
                    setImages([...base64Images]);
                    setPreviewImages([...previews]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'products'), {
                name: productName,
                description,
                price,
                images, // store base64 images directly in Firestore
                adminId  // Include adminId in the Firestore document
            });

            await Swal.fire({
                title: 'Success!',
                text: 'Product added successfully',
                icon: 'success',
                confirmButtonText: 'Okay'
            });

            // Reset form
            setProductName('');
            setDescription('');
            setPrice('');
            setImages([]);
            setPreviewImages([]);
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Error adding product: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    return (
        <div className="mx-4 mb-4">
            <h2 className="text-center text-2xl font-bold">Add New Product</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Product Name</label>
                    <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Price</label>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">Images</label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleImageChange}
                        className="w-full border rounded px-3 py-2" 
                        accept="image/*" 
                        required 
                    />
                    <div className="mt-2">
                        {previewImages.map((img, index) => (
                            <img key={index} src={img} alt={`Product Preview ${index}`} className="w-24 h-24 mr-2" />
                        ))}
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
