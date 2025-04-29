import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrderForm = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    // Reset error
    setError('');

    // Check if cart is empty
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return false;
    }

    // Validate name (at least 2 characters, only letters and spaces)
    if (!name.trim() || name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
      setError('Please enter a valid name (minimum 2 characters, letters only)');
      return false;
    }

    // Validate phone number (10 digits)
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${config.apiUrl}/api/order`, {
        name: name.trim(),
        phone: phone.trim(),
        items: cartItems,
        total: cartTotal,
        orderDate: new Date().toISOString()
      });
      console.log(response)


      // Store order details in localStorage for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify({
        orderId: response.data.orderId || 'ORD' + Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        items: cartItems,
        total: cartTotal,
        orderDate: new Date().toISOString()
      }));

      clearCart();
      navigate('/confirmation');
    } catch (err) {
      console.error('Order failed:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <div className="mb-6">
        <h3 className="font-medium mb-3">Order Summary:</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                  </div>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-2">
                <span>Tax (10%):</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-2">
                <span>Total:</span>
                <span>${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleOrder} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || cartItems.length === 0}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isSubmitting || cartItems.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isSubmitting ? 'Placing Order...' : cartItems.length === 0 ? 'Cart is Empty' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
