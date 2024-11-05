import React, { useEffect, useState } from 'react';
import { auth, db } from '../../components/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminProfile({ userId }) {
    console.log(userId)
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                try {
                    const userData = await getDoc(doc(db, 'usersAdmin', user.uid));
                    if (userData.exists()) {
                        setUserDetails(userData.data());
                    } else {
                        toast.error('No user data found!');
                        setUserDetails(null);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Error fetching user data: ' + error.message);
                }
            } else {
                setUserDetails(null);
            }
        };

        fetchUserData();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                setUserDetails(null);
            } else {
                fetchUserData();
            }
        });

        return () => unsubscribe();
    }, []);

    const handleManageProducts = () => {
       navigate('/manageproduct'); 
    };

    const handleManageOrders = () => {
      navigate('/bookings');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 max-w-3xl w-full">
                <div className="px-6 py-5">
                    <h3 className="font-serif text-3xl leading-6 font-medium text-[#67595e]">
                        {userDetails?.firstName}'s Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-2xl text-gray-600">
                        This is some information about the Admin.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-5">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl font-medium text-[#67595e]">Full name</dt>
                            <dd className="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {userDetails?.firstName} {userDetails?.lastName}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl font-medium text-[#67595e]">Email address</dt>
                            <dd className="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {userDetails?.email}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl font-medium text-[#67595e]">Phone number</dt>
                            <dd className="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {userDetails?.mobile}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-2xl font-medium text-[#67595e]">Address</dt>
                            <dd className="mt-1 text-2xl text-gray-900 sm:mt-0 sm:col-span-2">
                                123 Main St<br/>
                                Anytown, PMB 12345
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="px-6 py-5 flex justify-around">
                    <button 
                        className="bg-[#68bbe3] hover:bg-[#a49393] text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleManageProducts}
                    >
                        Manage Products
                    </button>
                    <button 
                        className="bg-[#68bbe3] hover:bg-[#a49393] text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleManageOrders}
                    >
                        Manage Orders
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
