const express = require('express');
const dotenv = require('dotenv');
const supabase = require('./config');

const authRouter = require('./router/auth/admin/index');
const commonRouter = require('./router/common/index');

const server = express();
dotenv.config();
server.use(express.json());
server.use('/auth/admin', authRouter);
server.use('/common', commonRouter);

const PORT = process.env.PORT || '3001';

const appServer = server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

if (!supabase) {
  appServer.close();
}

module.exports = { server, appServer };
