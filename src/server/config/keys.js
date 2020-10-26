const OSU_TOKENS = {
  OSU_CLIENT_ID: 1234,
  OSU_CLIENT_SECRET: ''
};

const DB_USER = '';
const DB_PASSWORD = '';
const MONGODB = {
  MONGODB_URI: ``
};

const SESSION = {
  COOKIE_KEY: 'ehe'
};

const KEYS = {
  ...OSU_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
