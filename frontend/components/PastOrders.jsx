import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiPhone, HiRefresh, HiX } from 'react-icons/hi';
import config from '../src/config';

const PastOrders = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      setPhone(savedPhone);
      fetchOrders(savedPhone);
    }
  }, []);

  const fetchOrders = async (phoneNumber) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://the-digital-dinner-cyan.vercel.app/api/order/${phoneNumber}`);
      const processedOrders = response.data.map(order => ({
        ...order,
        cart: typeof order.cart === 'string' ? JSON.parse(order.cart) : order.cart
      }));
      setOrders(processedOrders);
      setIsVerified(true);
      localStorage.setItem('userPhone', phoneNumber);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    fetchOrders(phone);
  };

  const handleReset = () => {
    setPhone('');
    setOrders([]);
    setIsVerified(false);
    localStorage.removeItem('userPhone');
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderTotal = (cart) => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Order History</h2>

        {!isVerified && (
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              Please enter your phone number to view your order history
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Phone Number:</label>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setError('');
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {loading ? 'Fetching Orders...' : 'View Orders'}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {isVerified && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-gray-600">Phone Number:</span>
                <span className="ml-2 font-medium">{phone}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchOrders(phone)}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                  title="Refresh Orders"
                >
                  <HiRefresh className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  title="Change Phone Number"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No orders found for this phone number
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium text-lg">
                          Order #{order.id}
                        </div>
                        <div className="text-gray-500">
                          {formatDate(order.orderdate)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-lg">
                          ${calculateOrderTotal(order.cart).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Array.isArray(order.cart) ? order.cart.length : 0} items
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {Array.isArray(order.cart) && order.cart.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-gray-500">
                                Quantity: {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastOrders;
