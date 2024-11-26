import React from "react";
import imgCard from "../img/payments.png";
import logofooter from "../img/logochadport.png";
type Props = {};

const FooterClient = (props: Props) => {
  return (
    <>
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Section: Logo Contact */}
          <div className="flex flex-col space-y-4 w-full md:w-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Logo and Name */}
              <div className="flex items-center space-x-3 mb-6">
                <img src={logofooter} alt="Logo" />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm">hello@maxwell.com</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Phone Number</span>
                  <span className="text-sm">+1 (201) 895-3801</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: CTA Buttons */}
          <div className="text-left w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              Get Started With Our Shoe Shopping Now
            </h3>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium">
                Try Maxwell
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-full font-medium">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Platform Availability */}
        <div className="container mx-auto px-4 md:px-8 border-t border-gray-200 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 font-medium text-center">
            Available on all platforms
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">computer</span> Windows
            </span>
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">computer</span> macOS
            </span>
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">code</span> Linux
            </span>
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">language</span> Chrome
            </span>
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">phone_iphone</span> iOS
            </span>
            <span className="flex items-center border border-gray-300 px-3 py-1 rounded-full text-sm">
              <span className="material-icons mr-1">android</span> Android
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterClient;
