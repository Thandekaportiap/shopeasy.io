import React from 'react';
import { Link } from 'react-router-dom'; 
import { TiShoppingCart } from 'react-icons/ti';

const HomePage = () => {
  let image = require('../assets/images(1).png');
  let image1 = require('../assets/laptop-removebg-preview.png');
  let image2 = require('../assets/blackSM-removebg-preview.png');
  return (
    <>
      <section className='w-full h-screen flex flex-col lg:flex-row items-center justify-between px-4 lg:px-12 text-[#675953]'>
        <div className='flex flex-col items-start'>
          <h1 className='text-7xl font-bold leading-tight uppercase tracking-wider text-[#675953]'>
            Grab Up To<br />
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
              <span className="relative text-white">50% OFF </span>
            </span>
            <br />on electronics
          </h1>
          <h4 className='mt-4 text-xl lg:text-2xl text-[#e8b4b8]'>
            Shopping made easy with your favourite products
          </h4>
          <div className='mt-8 flex flex-col items-center justify-center'>
            <Link to={'/allproducts'}>
              <button type="button" className='bg-[#675953] text-[#eed6d3] text-lg lg:text-2xl font-semibold px-4 py-2 rounded-md mt-8 flex items-center'>
                Shop Now
                <TiShoppingCart className="ml-2 text-[#eed6d3]" size={20} />
              </button>
            </Link>
          </div>
        </div>

        <div className="lg:ml-auto lg:text-right mt-10 lg:mt-0">
  <div className="relative z-10 inline-block pt-11 lg:pt-0 w-full h-full max-w-lg"> {/* Set max width here */}
  </div>
  <img
      src={image1}
      alt="hero"
      className="rounded-tl-3xl w-full h-auto" // Change this to w-full for full width
    />
   
</div>

      </section>
    </>
  );
};

export default HomePage;
