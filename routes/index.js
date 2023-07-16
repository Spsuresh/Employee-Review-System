const express = require('express'); 
const router = express.Router();
const homeController = require('../controllers/home_controller'); 

console.log(`router is loaded : {200}`);

router.get('/', homeController.home);

router.use('/users' , require('./users'));
router.use('/admin' , require('./admin'));

router.use('/reviews', require('./reviews'));

module.exports = router;