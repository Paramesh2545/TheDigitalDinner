import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMenu = async () => {
  try {
    const response = await api.get('/api/menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/api/order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const getOrdersByPhone = async (phone) => {
  try {
    const response = await api.get(`/api/order/${phone}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}; 