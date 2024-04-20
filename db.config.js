require('dotenv').config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USERRAILWAY,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.RAILWAYDB,
    PORT: process.env.PORT
};