const AuthRoute = require('../routes/auth-routes');

module.exports = function setup(app) {
  app.use('/auth', AuthRoute);
};
