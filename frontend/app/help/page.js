'use client';

import { useState, useRef } from 'react';
import Particles from '@/components/ui/particles';

export default function Help() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const contentRefs = useRef([]);
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });

  //faq active question
  const handleQuestionToggle = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  //faqs
  const faqs = [
    { question: 'How do I create an account?', answer: 'To create an account, click on the "Register button on the navigation bar and fill out the registration form with your details.' },
    { question: 'How do I add movies to my favorites?', answer: 'To add a movie to your favorites, browse through the movies and click the add to favorites next to the movie title and poster.' },
    { question: 'How can I update my profile?', answer: 'You can update your profile by going to the profile page and clicking on "Edit Profile".' },
    { question: 'How can I reset my password?', answer: 'If you forgot your password, you can reset it by clicking "Forgot Password" on the login page and following the instructions (not implemented yet)' }
  ];

  return (
    <div className="min-h-screen bg-gray-800 p-6 font-sans mt-10">
      {/* Import particles */}
      <Particles 
        className="absolute inset-0 z-0" 
        quantity={100} 
        ease={80} 
        color="#ffffff"
        refresh
      />

      <div className="space-y-8 mt-10 max-w-4xl mx-auto rounded-lg bg-gray-900 p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center">Help & FAQs</h1>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleQuestionToggle(index)}
              >
                <h2 className="text-xl font-semibold text-white">{faq.question}</h2>
                <span className="text-white text-2xl">{activeQuestion === index ? '-' : '+'}</span>
              </div>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${activeQuestion === index ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}
                style={{
                  maxHeight: activeQuestion === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px',
                }}
              >
                <p className="text-gray-300 mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-8 border-gray-600" /> {/* Horizontal line between FAQ and Form */}

        {/* Form Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white">Submit Your Question - <span className='text-red-900'>Under construction</span></h2>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="text-white block mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-white block mb-2">Your Email</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="question" className="text-white block mb-2">Your Question</label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                rows="4"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-red-800 text-white px-6 py-2 rounded-full"
            >
              Under construction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
