require('dotenv').config();

const PORT = +process.env.PORT;
const SECRET_WORD = process.env.SECRET_WORD
const SALT_ROUNDS = 8
const FRONT_URL = process.env.FRONT_URL
const STRIPE_SECRET = process.env.STRIPE_SECRET

module.exports = {
  PORT,
  SECRET_WORD,
  SALT_ROUNDS,
  FRONT_URL,
  STRIPE_SECRET
};
