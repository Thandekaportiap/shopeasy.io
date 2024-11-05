import React from 'react';
import { Link } from 'react-router-dom'; 
import { TiShoppingCart } from 'react-icons/ti';

const HomePage = () => {
  let image = require('../assets/images (1).jpeg');
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
    <img
      src={image}
      alt="hero"
      className="rounded-tl-3xl w-full h-auto" // Change this to w-full for full width
    />
    <span className="absolute -bottom-8 -left-8 z-[-1]">
      <svg
        width="120" // Increase width for the SVG if needed
        height="120" // Increase height for the SVG if needed
        viewBox="0 0 120 120" // Adjust viewBox if you change width and height
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i} cx="3.5" cy={(i + 1) * 22} r="3.5" fill="#675953" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i + 5} cx="25.5" cy={(i + 1) * 22} r="3.5" fill="#675953" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i + 10} cx="47.5" cy={(i + 1) * 22} r="3.5" fill="#675953" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i + 15} cx="69.5" cy={(i + 1) * 22} r="3.5" fill="#675953" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i + 20} cx="91.5" cy={(i + 1) * 22} r="3.5" fill="#675953" />
        ))}
      </svg>
    </span>
  </div>
</div>

      </section>
    </>
  );
};

export default HomePage;
