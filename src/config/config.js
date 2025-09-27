/* eslint-disable no-undef */
const _config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DB,
  ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

// to make this object only readable
export const config = Object.freeze(_config);
