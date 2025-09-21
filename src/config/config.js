/* eslint-disable no-undef */
const _config = {
  PORT: process.env.PORT,
  DATABASE_URL : process.env.DB, 
  ENV : process.env.NODE_ENV
};

// to make this object only readable
export const config = Object.freeze(_config);
