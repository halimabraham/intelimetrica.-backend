const restaurantModel = require('../models/restaurant.model');

// Create a new restaurant
async function createRestaurant(req, res) {
    const body = req.body;
    const newRestaurant = {
        id : body.id,
        rating : body.rating,
        name : body.name,
        site : body.site,
        email: body.email,
        phone : body.phone,
        street : body.street,
        city : body.city,
        state : body.state, 
        lat : body.lat,
        lng: body.lng
    };
    try {
        await restaurantModel.createRestaurant(newRestaurant);
        res.status(200).send('Succesfully created restaurant');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating restaurant' });
    }
}

// Obtaining a restaurant
async function getAllRestaurants(req, res) {
    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaing restaurants' });
    }
}

// Updating a restaurant
async function updateRestaurant(req, res) {
    console.log('entra')
    const id = req.params.id;
    console.log(id)
    const body = req.body;
    const updatedRestaurant = {
        rating : body.rating,
        name : body.name,
        site : body.site,
        email: body.email,
        phone : body.phone,
        street : body.street,
        city : body.city,
        state : body.state, 
        lat : body.lat,
        lng: body.lng
    };
    try {
        await restaurantModel.updateRestaurant(id, updatedRestaurant);
        res.status(200).send('Succesfully updated restaurant');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating restaurant' });
    }
}

// Delete an existing restaurant
async function deleteRestaurant(req, res) {
    const id = req.params.id;
    try {
        await restaurantModel.deleteRestaurant(id)
        res.status(200).send('Succesfully eliminated restaurant');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting restaurant' });
    }
}

// Get restaurant info based on it's location
async function getRestaurantLocationInfo(req, res) {
    const { latitude, longitude, radius } = req.query;
    try {
        const restaurantLocationInfo = await restaurantModel.getRestaurantLocationInfo(latitude, longitude, radius);
        res.json(restaurantLocationInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining restaurant info' });
    }
}

// Otros controladores para crear, actualizar y eliminar restaurantes

module.exports = { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantLocationInfo };
