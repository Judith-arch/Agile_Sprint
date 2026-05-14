require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('PORT no está definido en .env');
}

module.exports = {
  PORT: process.env.PORT,
};