import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiViewGrid, HiMenu, HiShoppingCart, HiClock, HiUser } from 'react-icons/hi';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: HiHome, label: 'Home', path: '/' },
    { icon: HiShoppingCart, label: 'Order', path: '/order' },
    { icon: HiClock, label: 'History', path: '/history' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-lg">
        <div className="h-full flex flex-col items-center py-6">
          <div className="mb-8">
            <img src="/myeatos_logo.jpeg" alt="Logo" className="w-12 h-12" />
          </div>
          
          <nav className="flex-1 space-y-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-full p-3 text-sm
                    ${isActive 
                      ? 'text-orange-500' 
                      : 'text-gray-500 hover:text-orange-500'
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="mt-1 text-xs">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {/* <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-full h-full object-cover"
              /> */}
              <HiUser className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout; 