const express = require('express');
const dotenv = require('dotenv');
const supabase = require('./config');

const server = express();
dotenv.config();
server.use(express.json());

const PORT = process.env.PORT || '3001';

if (supabase) {
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
} else {
  console.log('Server startup failed');
}
