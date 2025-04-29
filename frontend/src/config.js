const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://your-vercel-backend-url.vercel.app'  // Replace with your Vercel backend URL
    : 'http://localhost:3000'
};

export default config; 