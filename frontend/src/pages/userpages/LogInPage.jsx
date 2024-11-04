import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/Firebase';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Features/Login/LoginSlice';
import Swal from 'sweetalert2';

const LogInPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = "Customer";

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            dispatch(setUser({ email: user.email, uid: user.uid }));
            handleLogin(user.uid, role);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User logged in successfully',
                confirmButtonText: 'OK',
            });

            navigate("/userprofile");

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error.message,
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="font-[sans-serif] max-w-7xl mx-auto h-screen flex items-center justify-center">
            <form className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-12">
                    <h3 className="text-[#67595e] text-4xl font-extrabold">Sign in</h3>
                    <p className="text-[#67595e] text-sm mt-6">Effortlessly access your account.</p>
                </div>

                <div>
                    <label className="text-[#67595e] text-[15px] mb-2 block">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        required 
                        className="w-full text-sm text-[#67595e] bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#eec603]" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="mt-4">
                    <label className="text-[#67595e] text-[15px] mb-2 block">Password</label>
                    <input 
                        name="password" 
                        type="password" 
                        required 
                        className="w-full text-sm text-[#67595e] bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#eec603]" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                    <div className="flex items-center">
                        <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                            className="shrink-0 h-4 w-4 text-[#eec603] focus:ring-yellow-500 border-gray-300 rounded-md" 
                        />
                        <label htmlFor="remember-me" className="ml-3 block text-sm text-[#67595e]">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgot-password" className="text-[#eec603] font-semibold hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-[#67595e] hover:bg-[#503f45] focus:outline-none">
                        Log in
                    </button>
                </div>
                <p className="text-sm mt-8 text-center text-[#67595e]">
                    Don't have an account? 
                    <Link to="/register/customer" className="text-[#eec603] font-semibold tracking-wide hover:underline ml-1">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default LogInPage;
