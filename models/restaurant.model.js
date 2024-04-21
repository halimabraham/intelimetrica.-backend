const mysql = require('mysql2/promise');
const dbConfig = require('../db.config');

// Create a new restaurant
async function createRestaurant(newRestaurant) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = `
            INSERT INTO restaurantes (id, rating, name, site, email, phone, street, city, state, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            newRestaurant.id,
            newRestaurant.rating,
            newRestaurant.name,
            newRestaurant.site,
            newRestaurant.email,
            newRestaurant.phone,
            newRestaurant.street,
            newRestaurant.city,
            newRestaurant.state,
            newRestaurant.lat,
            newRestaurant.lng
        ];
        const [result] = await connection.query(query, values);
        connection.end();
        return result.insertId;
    } catch (error) {
        console.error('Error creating a new restaurant:', error);
        throw error;
    }
}

// Get all restaurants
async function getAllRestaurants() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const [rows, fields] = await connection.query('SELECT * FROM restaurantes');
        connection.end();
        return rows;
    } catch (error) {
        console.error('Error obtaining all restaurants:', error);
        throw error;
    }
}

// Update a restaurant
async function updateRestaurant(id, updatedRestaurant) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = `
            UPDATE restaurantes
            SET rating = ?, name = ?, site = ?, email = ?, phone = ?, street = ?,
                city = ?, state = ?, lat = ?, lng = ?
            WHERE id = ?
        `;
        const values = [
            updatedRestaurant.rating,
            updatedRestaurant.name,
            updatedRestaurant.site,
            updatedRestaurant.email,
            updatedRestaurant.phone,
            updatedRestaurant.street,
            updatedRestaurant.city,
            updatedRestaurant.state,
            updatedRestaurant.lat,
            updatedRestaurant.lng,
            id
        ];
        const [result] = await connection.query(query, values);
        connection.end();
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating restaurant:', error);
        throw error;
    }
}

// Delete an existing restaurant
async function deleteRestaurant(id) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = 'DELETE FROM restaurantes WHERE id = ?';
        const [result] = await connection.query(query, [id]);
        connection.end();
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
}

async function getRestaurantLocationInfo(latitude, longitude, radius) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        const query = `
            SELECT
                COUNT(*) AS count,
                AVG(rating) AS avg,
                STDDEV(rating) AS std
            FROM
                restaurantes
            WHERE
                ST_Within(
                    POINT(lat, lng),
                    ST_Buffer(
                        POINT(? , ?),
                        ?
                    )
                );
        `;


        const [result] = await connection.query(query, [latitude, longitude, radius]);
        connection.end();
        
        return result[0];
    } catch (error) {
        console.error('Error retrieving restaurant location info:', error);
        throw error;
    }
}

module.exports = { getAllRestaurants, createRestaurant,  updateRestaurant, deleteRestaurant, getRestaurantLocationInfo };
