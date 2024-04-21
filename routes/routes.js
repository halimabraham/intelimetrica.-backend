const express = require('express');
const router = express.Router();
const { getAllRestaurants,  createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantLocationInfo } = require('../controllers/restaurant.controller')

// Initial Route
router.get('/', (req, res) => {
    res.send('¡Hello, world!');
});

// Crud Routes
router.get('/getRestaurants', getAllRestaurants)
router.post('/createRestaurant', createRestaurant)
router.put('/updateRestaurant/:id', updateRestaurant)
router.delete('/deleteRestaurant/:id', deleteRestaurant)

// Additional Route
router.get('/restaurants/statistics', getRestaurantLocationInfo)

module.exports = router;