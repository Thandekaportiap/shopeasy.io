import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../../Features/Register/RegisterAdminSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [company, setCompany] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(registerAdmin({
                username,
                email,
                password,
                firstName,
                lastName,
                mobile,
                profilePicture,
                company,
            }));

            if (registerAdmin.fulfilled.match(resultAction)) {
                await Swal.fire({
                    title: 'Success!',
                    text: 'Admin created successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
                navigate('/login/admin');
            } else {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Admin creation failed: ' + resultAction.payload,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Error: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    return (
        <div className="font-[sans-serif]">
            <div className="text-center bg-gradient-to-r from-[#2D3748] to-[#4A5568] min-h-[160px] sm:p-6 p-4">
                <h4 className="sm:text-3xl text-2xl font-bold text-[#E2E8F0]">Create your new account</h4>
            </div>

            <div className="mx-4 mb-4 -mt-16">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#F7FAFC] shadow-md sm:p-8 p-4 rounded-md">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Company Name</label>
                            <input 
                                type="text" 
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter company name" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Username</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter username" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">First Name</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter first name" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Last Name</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter last name" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Email Id</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter email" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Mobile No.</label>
                            <input 
                                type="tel" 
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter mobile number" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                                placeholder="Enter password" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm mb-2 block">Profile Picture</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="bg-[#EDF2F7] focus:bg-white w-full text-sm text-gray-700 px-4 py-3 rounded-md outline-[#3182CE] transition-all" 
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-[#2D3748] hover:bg-[#4A5568] focus:outline-none">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;
