import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiPhone, HiMail, HiLocationMarker, HiDotsVertical } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { HiSearch, HiShoppingCart, HiMinusSm, HiPlusSm } from 'react-icons/hi';

const OrderStatus = ({ time, status, isCompleted }) => (
  <div className="flex items-center gap-3">
    <div className={`rounded-full p-2 ${isCompleted ? 'bg-orange-500' : 'bg-gray-200'}`}>
      <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-white' : 'bg-gray-400'}`} />
    </div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{time}</div>
      <div className="font-medium">{status}</div>
    </div>
  </div>
);

const OrderForm = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, updateQuantity } = useCart();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <HiArrowLeft className="w-5 h-5 mr-2" />
          Order Details
        </button>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mx-2">Dashboard</span>
          <span>/</span>
          <span className="mx-2">Customer Orders</span>
          <span>/</span>
          <span className="mx-2">Order Details</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Order ID and Status */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID <span className="text-orange-500">#ORD1028</span>
              </h2>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-sm">
                Online
              </span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <HiDotsVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Order List */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold mb-4">Order List</h3>
            <table className="w-full">
              <thead className="text-sm text-gray-500">
                <tr>
                  <th className="text-left pb-4">Item</th>
                  <th className="text-center pb-4" colSpan="3">Quantity</th>
                  <th className="text-left pb-4">Notes</th>
                  <th className="text-right pb-4">Price</th>
                  <th className="text-right pb-4">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cartItems.map((item) => (
                  <tr key={item._id} className="text-sm">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center" colSpan="3">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <HiMinusSm className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <HiPlusSm className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="text-gray-500">{item.notes || '-'}</td>
                    <td className="text-right">${item.price.toFixed(2)}</td>
                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="pt-4">
                    <div className="flex justify-end font-medium">
                      Total Amount: ${cartTotal.toFixed(2)}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className='mt-4'>
              <button 
                onClick={() => navigate('/order/form')} 
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

          {/* Customer Info and Order Tracking */}
          {/* <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Customer</h3>
                <button className="text-gray-400 hover:text-gray-600">•••</button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/profile-placeholder.png"
                    alt={customerInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{customerInfo.name}</h4>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="w-4 h-4" />
                      {customerInfo.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <HiMail className="w-4 h-4" />
                      {customerInfo.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <HiPhone className="w-4 h-4" />
                      {customerInfo.phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50">
                  Send a Message
                </button>
                <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Make a Call
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Order Tracking</h3>
                <button className="text-gray-400 hover:text-gray-600">•••</button>
              </div>
              <div className="space-y-6">
                {orderStatuses.map((status, index) => (
                  <OrderStatus
                    key={index}
                    time={status.time}
                    status={status.status}
                    isCompleted={status.completed}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Section - Map and Driver Info */}
        {/* <div className="w-96">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="h-96 bg-gray-100 rounded-lg mb-4">
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-medium">Bella Italia</div>
                <div className="text-gray-500">456 Olive St.</div>
              </div>
              <div className="text-right">
                <div className="font-medium">4.5 miles • 30 min</div>
                <div className="text-gray-500">Estimated Arrival Time</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Driver</h3>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="/driver-placeholder.png"
                  alt={driverInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{driverInfo.name}</h4>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                  {driverInfo.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Phone</div>
                <div>{driverInfo.phone}</div>
              </div>
              <div>
                <div className="text-gray-500">Vehicle Type</div>
                <div>{driverInfo.vehicleType}</div>
              </div>
              <div>
                <div className="text-gray-500">Vehicle Number</div>
                <div>{driverInfo.vehicleNumber}</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderForm;
