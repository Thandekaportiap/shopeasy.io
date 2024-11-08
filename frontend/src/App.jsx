import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId, clearUserId } from './Features/UsersSlice';
import Navbar from './components/NavBar';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import LogInPage from './pages/userpages/LogInPage';
import RegisterPage from './pages/userpages/RegisterPage';
import RegisterAdmin from './pages/adminpages/RegisterAdmin';
import LogInAdmin from './pages/adminpages/LogInAdmin';
import './App.css';
import Footer from './components/Footer';
import AddProduct from './pages/adminpages/AddProduct';
import ManageProductsList from './pages/adminpages/ManageProduct';
import AllProductsList from './pages/AllProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/userpages/Cart';
import AdminProfile from './pages/adminpages/adminProfile';
import ManageOrders from './pages/adminpages/ManageOrders';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Privacy from './pages/Privacy';


function App() {
  const [id, setId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserId = localStorage.getItem('loggedInUserId');
    const savedUserRole = localStorage.getItem('userRole');

    if (savedUserId) {
      setId(savedUserId);
      dispatch(setUserId(savedUserId));
    }
    if (savedUserRole) {
      setUserRole(savedUserRole);
    }
  }, [dispatch]);

  const handleLogin = (userId, role) => {
    setId(userId);
    setUserRole(role);
    localStorage.setItem('loggedInUserId', userId);
    localStorage.setItem('userRole', role);
    dispatch(setUserId(userId));
  };

  const handleLogout = () => {
    setId(null);
    setUserRole(null);
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('userRole');
    dispatch(clearUserId());
    navigate('/');
  };

  return (
    <>
      <Navbar id={id} onLogout={handleLogout} role={userRole}/>
     <div className='min-h-screen'>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/customer" element={<LogInPage role="Customer" handleLogin={handleLogin} />} />
        <Route path="/login/admin" element={<LogInAdmin role="Admin" handleLogin={handleLogin} />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />
        <Route path="/register/customer" element={<RegisterPage />} />
        <Route path='/addproduct' element={<AddProduct adminId={id} />} />
        <Route path='/manageproduct' element={<ManageProductsList adminId={id} />} />
        <Route path='/allproducts' element={<AllProductsList customerId={id} />} />
        <Route path="/product/:id" element={<ProductDetails customerId={id} />} />
        <Route path='/adminProfile' element={<AdminProfile userId={id} />} />
        <Route path='/cart' element={<Cart customerId={id} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
     </div>
      <Footer />
    </>
  );
}

export default App;
