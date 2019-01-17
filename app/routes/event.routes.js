const verifyToken = require('../middlewares/verifyToken.middleware');
const event = require('../controllers/event.controller');

module.exports = (app) => {
  app.post('/api/addEvent', verifyToken, event.addEvent); 
  app.get('/api/getEvents', verifyToken, event.getAllEvents);
}
