import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#67595e] text-white py-4 px-6">
          <h1 className="text-3xl font-bold">About Shopeasy.io</h1>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#67595e]">Who We Are</h2>
          <p className="text-gray-700 mt-2">
            At Shopeasy.io, we are passionate about technology and committed to helping you find the latest and greatest electronics. Whether you’re looking for smartphones, laptops, accessories, or home gadgets, we’ve got you covered. Our team is dedicated to sourcing high-quality products that meet the diverse needs of our customers.
          </p>

          <h2 className="text-xl font-semibold text-[#67595e] mt-4">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            We believe that shopping for electronics should be simple, enjoyable, and accessible to everyone. Our goal is to make the process of finding and purchasing electronics as easy as possible. With a user-friendly interface, secure payment options, and reliable customer service, we strive to create a hassle-free shopping environment.
          </p>

          <h2 className="text-xl font-semibold text-[#67595e] mt-4">What We Offer</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Wide Range of Products: Explore our extensive collection of electronics from top brands.</li>
            <li>Competitive Pricing: We work hard to offer competitive prices on all our products.</li>
            <li>Customer-Centric Service: Our dedicated customer support team is here to assist you.</li>
            <li>Secure Shopping Experience: Shop with confidence knowing your personal information is safe with us.</li>
          </ul>

          <h2 className="text-xl font-semibold text-[#67595e] mt-4">Join Us on Our Journey</h2>
          <p className="text-gray-700 mt-2">
            As we continue to grow and expand our product offerings, we invite you to join us on this exciting journey. Sign up for our newsletter to stay updated on the latest products, promotions, and special events.
          </p>

          <h2 className="text-xl font-semibold text-[#67595e] mt-4">Contact Us</h2>
          <p className="text-gray-700 mt-2">
            Have questions or feedback? Feel free to reach out to us through our contact page or connect with us on social media. We love hearing from our customers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
