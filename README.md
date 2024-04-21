# Intelimetrica Assessment
Rest API that works with restaurants information.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Routes](#api-routes)
5. [Technologies Used](#technologies-used)
6. [Contribution](#contribution)
7. [License](#license)

## Introduction

This project was created with the intention of demonstrating my applied knowledge of a Rest API, as part of the Intelimetrica recruiting process.

## Installation

You can clone the repository by clicking on "<> Code". To install it, just run the npm install command, this will install all the dependencies and modules of the project. (Environment variables required)

## Usage

You can run the project with the "npm start" command..

## API Routes

### Get All Restaurants

- **URL:** `/getRestaurants`
- **Method:** GET
- **Description:** Retrieves all restaurants from the database.
- **Request Parameters:** None
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Array of restaurant objects
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "error": "Error obtaining restaurants" }`
- **Sample Request:**
https://intelimetrica-backend.onrender.com/getRestaurants

### Create Restaurant

- **URL:** `/createRestaurant`
- **Method:** POST
- **Description:** Creates a new restaurant in the database.
- **Request Parameters:**
  - `id` (string, required): Unique identifier for the restaurant.
  - `rating` (integer, required): Rating of the restaurant.
  - `name` (string, required): Name of the restaurant.
  - `site` (string, required): Website URL of the restaurant.
  - `email` (string, required): Email address of the restaurant.
  - `phone` (string, required): Phone number of the restaurant.
  - `street` (string, required): Street address of the restaurant.
  - `city` (string, required): City where the restaurant is located.
  - `state` (string, required): State where the restaurant is located.
  - `lat` (float, required): Latitude coordinate of the restaurant.
  - `lng` (float, required): Longitude coordinate of the restaurant.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Success message: "Successfully created restaurant"
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "error": "Error creating restaurant" }`
- **Sample Request:**
https://intelimetrica-backend.onrender.com/createRestaurant
{
    "id": "851f799f-0852-439e-b9b2-df92c43e7672",
    "rating": 1,
    "name": "Barajas, Bahena and Kano",
    "site": "https://federico.com",
    "email": "Anita_Mata71@hotmail.com",
    "phone": "534 814 204",
    "street": "82247 Mariano Entrada",
    "city": "Mérida Alfredotown",
    "state": "Durango",
    "lat": 19.4400570537131,
    "lng": -99.1270470974249
  }

### Update Restaurant

- **URL:** `/updateRestaurant/:id`
- **Method:** PUT
- **Description:** Updates an existing restaurant in the database.
- **URL Parameters:**
  - `id` (string, required): Unique identifier of the restaurant to be updated.
- **Request Body:**
  - `rating` (integer, required): Rating of the restaurant.
  - `name` (string, required): Name of the restaurant.
  - `site` (string, required): Website URL of the restaurant.
  - `email` (string, required): Email address of the restaurant.
  - `phone` (string, required): Phone number of the restaurant.
  - `street` (string, required): Street address of the restaurant.
  - `city` (string, required): City where the restaurant is located.
  - `state` (string, required): State where the restaurant is located.
  - `lat` (float, required): Latitude coordinate of the restaurant.
  - `lng` (float, required): Longitude coordinate of the restaurant.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Success message: "Successfully updated restaurant"
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "error": "Error updating restaurant" }`
- **Sample Request:**
https://intelimetrica-backend.onrender.com/updateRestaurant/12345
{
    "rating": 3,
    "name": "Updated Restaurant Name",
    "site": "https://updated-website.com",
    "email": "updated@example.com",
    "phone": "123-456-7890",
    "street": "123 Updated Street",
    "city": "Updated City",
    "state": "Updated State",
    "lat": 12.345,
    "lng": -67.890
}

### Delete Restaurant

- **URL:** `/deleteRestaurant/:id`
- **Method:** DELETE
- **Description:** Deletes an existing restaurant from the database.
- **URL Parameters:**
  - `id` (string, required): Unique identifier of the restaurant to be deleted.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Success message: "Successfully eliminated restaurant"
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "error": "Error deleting restaurant" }`
- **Sample Request:**
https://intelimetrica-backend.onrender.com/deleteRestaurant/12345

### Get Restaurant Location Statistics

- **URL:** `/restaurants/statistics`
- **Method:** GET
- **Description:** Retrieves statistics about restaurants located within a specified radius from a given latitude and longitude.
- **Query Parameters:**
  - `latitude` (number, required): The latitude coordinate of the center of the circle.
  - `longitude` (number, required): The longitude coordinate of the center of the circle.
  - `radius` (number, required): The radius of the circle in meters.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** JSON object containing the following data:
    - `count`: Count of restaurants that fall inside the circle with center [x,y] and radius z.
    - `avg`: Average rating of restaurants inside the circle.
    - `std`: Standard deviation of rating of restaurants inside the circle.
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "error": "Error obtaining restaurant info" }`
- **Sample Request:**
https://intelimetrica-backend.onrender.com/restaurants/statistics?latitude=19.433497663015&longitude=-99.1285135065721&radius=100

## Technologies Used

The technologies used in the project were: Node JS for the backend (with Express as a framework). Railway for the deployment of the MYSQL database. Render for the deployment of the Rest API.
