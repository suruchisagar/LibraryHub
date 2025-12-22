import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      {/* Subscribe Section */}
      <div className="bg-yellow-500 text-center py-12 px-4 flex-grow flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase mb-4">
          Join Library Community to Get Updates
        </h2>
        <p className="text-white text-sm md:text-base mb-6">
          Enter your email to stay informed about new features & announcements.
        </p>
        <div className="flex flex-col md:flex-row gap-3 items-center bg-white p-1 rounded-md">
          <input
            type="email"
            placeholder="Add your email here"
            className="px-4 py-2 rounded-md w-72 outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-10 px-6 border-t-4 border-yellow-500">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
    
    {/* Left - Brand Info and Social */}
    <div className="md:w-1/2">
      <h3 className="text-lg font-extrabold mb-3">LibManage</h3>
      <p className="text-gray-400 text-sm mb-4">
        Manage your library and study spaces with ease and efficiency.
      </p>
      <div className="flex gap-3 mt-2">
        <span className="bg-yellow-400 text-black p-2 rounded cursor-pointer">
          <FaFacebookF />
        </span>
        <span className="bg-yellow-400 text-black p-2 rounded cursor-pointer">
          <FaInstagram />
        </span>
        <span className="bg-yellow-400 text-black p-2 rounded cursor-pointer">
          <FaTwitter />
        </span>
        <span className="bg-yellow-400 text-black p-2 rounded cursor-pointer">
          <FaLinkedinIn />
        </span>
      </div>
    </div>

    {/* Right - Links Section */}
    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Company */}
      <div>
        <h4 className="text-md font-semibold mb-3">Company</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>About</li>
          <li>Contact us</li>
          <li>Support</li>
          <li>Careers</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-md font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Library Locator</li>
          <li>Booking History</li>
          <li>How It Works</li>
          <li>FAQs</li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-md font-semibold mb-3">Legal</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Footer;
