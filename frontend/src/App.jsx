import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
import PastOrders from '../components/PastOrders';
import OrderForm from '../components/OrderForm';
import { CartProvider } from '../context/CartContext';
import PlaceOrderForm from "../components/PlaceOrderForm"
import Confirmation from '../components/Confirmation';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={
              <div className="flex">
                <div className="flex-1 overflow-auto">
                  <Menu />
                </div>
                <Cart />
              </div>
            } />
            <Route path="/order" element={<OrderForm />} />
            <Route path ="/order/form" element={<PlaceOrderForm />}/>
            <Route path="/history" element={<PastOrders />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
