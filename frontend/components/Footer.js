'use client';

import { useState } from "react";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Modal from "./Modal";

export default function Footer() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  const privacyPolicyContent = (
    <div className="animate-pulse mb-6 text-center">
        <p className="text-xl mb-4">Whoops the admin forgot to implement this modal!</p>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="2" x2="12" y2="12" />
            <line x1="12" y1="12" x2="16" y2="16" />
        </svg>
    </div>
  );
  
  const termsOfServiceContent = (
    <div className="animate-pulse mb-6 text-center">
      <p className="text-xl mb-4">Whoops the admin forgot to implement this modal!</p>

      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="12" />
          <line x1="12" y1="12" x2="16" y2="16" />
      </svg>
    </div>
  );
  
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-8 shadow-lg mt-0">
      <div className="container mx-auto text-center">
        {/* Copyright Info */}
        <p className="mb-6 font-extrabold text-2xl text-gray-300">
          © 2024 MovieJaMMer. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <Link
            href="/help"
            className="hover:text-indigo-400 transition duration-300 text-lg font-semibold transform hover:scale-105"
          >
            Contact
          </Link>
          <Link
            href="/#aboutSection"
            className="hover:text-indigo-400 transition duration-300 text-lg font-semibold transform hover:scale-105"
          >
            About 
          </Link>
          <button
            onClick={() => setPrivacyModalOpen(true)}  
            className="hover:text-indigo-400 transition duration-300 text-lg font-semibold transform hover:scale-105"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTermsModalOpen(true)}  
            className="hover:text-indigo-400 transition duration-300 text-lg font-semibold transform hover:scale-105"
          >
            Terms of Service
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6 text-2xl">
          <Link
            href="https://www.linkedin.com/in/kabeer-harjani-b3b124248/"
            target="_blank"
            className="hover:text-blue-500 transition duration-300 transform hover:scale-110"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://github.com/KabeerH"
            target="_blank"
            className="hover:text-white transition duration-300 transform hover:scale-110"
          >
            <FaGithub />
          </Link>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-sm text-gray-400">
            <span className="block mb-2">
              Email: 
              <a
                href="mailto:kabeerharjani@gmail.com"
                className="hover:text-indigo-400 transition duration-300"
              >
                kabeerharjani@gmail.com
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
        content={privacyPolicyContent}
      />

      {/* Terms of Service Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms of Service"
        content={termsOfServiceContent}
      />
    </footer>
  );
}
