import React, { useEffect, useState } from 'react';
import { HiSearch, HiShoppingCart, HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiCupcake } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import config from '../src/config';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('pizza');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(()=>{
    const fetchMenu=async()=>{
      console.log(`${config.apiUrl}/api/menu`)
      const response=await axios.get(`${config.apiUrl}/api/menu`)
      setMenuItems(response.data)
    }
    fetchMenu()
  },[])
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-xl">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search category or menu"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">Current Orders</div>
            <div className="font-semibold">#907653</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Table</div>
            <div className="font-semibold">T1</div>
          </div>
        </div>
      </div>


      {/* Menu Items */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Choose Your Favorite</h2>
          <span className="text-gray-500">
            {menuItems.length} Items Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems
            .filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.category?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(item => {
              const cartItem = cartItems.find(i => i._id === item._id);
              return (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-orange-500 font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="text-sm text-gray-500">
                          {item.available} Available
                        </div>
                      </div>
                      <div>
                        {cartItem ? (
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                            <button 
                              onClick={() => updateQuantity(item._id, cartItem.quantity - 1)}
                              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              <HiMinusSm className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item._id, cartItem.quantity + 1)}
                              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              <HiPlusSm className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <HiShoppingCart className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
