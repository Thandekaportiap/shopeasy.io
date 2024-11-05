import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log(formData);
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#67595e] text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#67595e]">We’d love to hear from you!</h2>
          <p className="text-gray-700 mt-2">
            If you have any questions, feedback, or just want to say hello, feel free to reach out to us using the form below.
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-[#67595e]">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#67595e]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-[#67595e]">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#67595e]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold text-[#67595e]">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#67595e]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#67595e] text-white font-semibold py-2 rounded hover:bg-[#e8b4b8] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
