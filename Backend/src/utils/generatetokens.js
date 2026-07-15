import jwt from 'jsonwebtoken';

const generateTokens = (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '30days' }
  );
  return token;
};

export default generateTokens;