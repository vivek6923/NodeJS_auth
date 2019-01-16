//const varifyToken = require('../middlewares/verifyToken.middleware');
const auth = require('../controllers/auth.controller');

module.exports = (app) => {

  app.post('/register', auth.signup);

  app.post('/api/login', auth.login);
  
}
