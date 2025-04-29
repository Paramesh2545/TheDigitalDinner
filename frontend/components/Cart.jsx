import React from 'react';
import { HiMinusSm, HiPlusSm, HiPencil } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, cartTotal, itemCount } = useCart();
  const navigate = useNavigate();
  const tax = cartTotal * 0.10; // 10% tax
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      navigate('/order/form');
    }
  };

  return (
    <div className="w-96 bg-white shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-lg">Current Orders</h2>
            <div className="text-gray-500">Table T1</div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
              Dine In
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
              Take Away
            </button>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {item.customization}
                </div>
                <div className="text-orange-500 font-medium mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <HiMinusSm className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <HiPlusSm className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  <HiPencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 border-t space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Items ({itemCount})</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button 
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            cartItems.length === 0 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {cartItems.length === 0 ? 'Cart is Empty' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;