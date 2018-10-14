const proxy = require('http-proxy-middleware');

// required to circumvent the cors error with CRA 2.0

module.exports = function(app) {
  app.use('/api', proxy({ target: 'http://localhost:5000/' }));
};