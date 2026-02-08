import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import { PhoneCall } from "lucide-react";


export default function Footer() {
  return (
    // <footer className="footer">
    //   <div className="footer-container">

    //     {/* Company Info */}
    //     <div className="footer-section about">
    //       <h2>© 2010 - 2025 FinditParts Inc.</h2>
    //       <p>All Rights Reserved.</p>
    //       <p className="location">Headquartered in Los Angeles, CA.</p>
    //       <p className="email">support@finditparts.com</p>
    //       <p className="phone">(888) 312-8812 | Intl. +1 (213) 986-2140</p>
    //     </div>

    //     {/* Services */}
    //     <div className="footer-section">
    //       <h3>Services</h3>
    //       <ul>
    //         <li>Cores</li>
    //         <li>Returns</li>
    //         <li>Shipping Information</li>
    //         <li>Line of Credit</li>
    //         <li>FinditParts Pro</li>
    //         <li>Industry Links</li>
    //         <li>Developers</li>
    //         <li>Parts Directory</li>
    //         <li>Buy Now Pay Later</li>
    //         <li>Gifts for Truck Drivers</li>
    //       </ul>
    //     </div>

    //     {/* Company */}
    //     <div className="footer-section">
    //       <h3>Company</h3>
    //       <ul>
    //         <li>About Us</li>
    //         <li>Blog</li>
    //         <li>Careers</li>
    //         <li>FAQ</li>
    //         <li>Press</li>
    //         <li>Contact Us</li>
    //       </ul>
    //     </div>

    //     {/* Legal */}
    //     <div className="footer-section">
    //       <h3>Legal</h3>
    //       <ul>
    //         <li>Terms of Use</li>
    //         <li>Privacy Policy</li>
    //         <li>Accessibility</li>
    //         <li>Track or Return an Order</li>
    //       </ul>

    //       <div className="footer-socials">
    //         <a href="#"><FaXTwitter /></a>
    //         <a href="#"><FaFacebookF /></a>
    //         <a href="#"><FaInstagram /></a>
    //         <a href="#"><FaYoutube /></a>
    //         <a href="#"><FaLinkedinIn /></a>
    //       </div>
    //     </div>

    //   </div>

    //   <div className="footer-bottom">
    //     <p>© 2010 - 2025 FinditParts Inc. | All Rights Reserved.</p>
    //   </div>
    // </footer>
    <>
      <section className="py-16 bg-red-600 text-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Help Finding the Right Part?
              </h2>
              <p className="text-lg mb-6">
                Our experts are ready to assist you
              </p>
    
              <a
                href="tel:+919876543210"
                className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                <PhoneCall className="mr-2" />
                +1 (780) 264‑2644
              </a>
            </div>
          </section>
    
          {/* ================= FOOTER ================= */}
          <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
            © 2025 FairDealTruckParts. All rights reserved.
          </footer>
          </>
  );
}