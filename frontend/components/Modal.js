import React from "react";

export default function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="text-gray-600">{content}</div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}