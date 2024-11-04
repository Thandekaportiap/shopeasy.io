import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Features/Register/RegisterSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading ] = useState('');
    const [error, setError ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(registerUser({
                username,
                email,
                password,
                firstName,
                lastName,
                mobile,
                profilePicture
            }));

            if (registerUser.fulfilled.match(resultAction)) {
                toast.success('User created successfully', { position: "top-center" });
                alert("success");
                navigate("/login/customer");
            } else {
                toast.error('User creation failed: ' + resultAction.payload, { position: "top-center" });
            }
        } catch (error) {
            toast.error('Error: ' + error.message, { position: "top-center" });
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
            <div className="text-center bg-gradient-to-r from-[#67595e] to-[#eec6d3] min-h-[160px] sm:p-6 p-4">
                <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your new account</h4>
            </div>

            <div className="mx-4 mb-4 -mt-16">
                <form className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter mobile number"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                      
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-[#67595e] hover:bg-[#eec603] focus:outline-none" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
