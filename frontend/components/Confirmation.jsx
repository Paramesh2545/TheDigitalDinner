import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for your order. We’re preparing your food. You'll receive a call shortly!
      </p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default Confirmation;
