const express = require('express');
const routes = require('./routes/routes');
const mysql = require('mysql2/promise');
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.APPPORT;

// Parse requests with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

app.use('/', routes);

// First connection to DB
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        console.log('MySQL DB connection established');
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

connectToDatabase();

// Initialize server
app.listen(PORT, () => {
    console.log(`Express server running on port: ${PORT}`);
});
