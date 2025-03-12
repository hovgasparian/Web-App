const jwt = require('jsonwebtoken');
const {compare, genSalt, hash} = require('bcrypt');
const { SALT_ROUNDS, SECRET_WORD } = require('./constants');

const { sign, verify } = jwt;

const sendSuccessResponse = (res, data) => {
  return res.status(200).json({ success: true, ...data });
};

const sendErrorResponse = (res, errorMessage) => {
  return res.status(400).json({ success: false, error: errorMessage });
};

const comparePassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
  };
  
  const signToken = (payload) => {
    return sign(payload, SECRET_WORD);
  };
  
  const verifyToken = (token) => {
    return verify(token, SECRET_WORD);
  };

  const hashPassword = async (password) => {
    const salt = await genSalt(SALT_ROUNDS);
    return await hash(password, salt);
  };

  module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    signToken,
    verifyToken,
    comparePassword,
    hashPassword
  };
  