const express = require('express');
const dotenv = require('dotenv');
const supabase = require('./config');

const authRouter = require('./router/auth/admin/index');

const server = express();
dotenv.config();
server.use(express.json());
server.use('/auth/admin', authRouter);

const PORT = process.env.PORT || '3001';

if (supabase) {
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
} else {
  console.log('Server startup failed');
}
