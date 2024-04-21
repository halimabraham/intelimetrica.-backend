const express = require('express');
const routes = require('./routes/routes');
const mysql = require('mysql2/promise');
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.APPPORT;

// Parse requests with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usa our routes file
app.use('/', routes);

// Initial DB connection
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        console.log('Established connection with MYSQL DB');
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Execute DB connection function
connectToDatabase();

// Start server
app.listen(PORT, () => {
    console.log(`Express server running on port: ${PORT}`);
});