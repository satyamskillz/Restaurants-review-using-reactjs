const express = require("express");
const morgan = require("morgan");
const db = require('./db')
const cors = require("cors")
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/getRestaurants", async (req, res) => {
    
    try{
        const results = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id");

        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            restaurant: results.rows,
            }
        })   
    }catch (err){
        console.log(err)
    }
});
// get one Restaurants
app.get("/api/v1/getRestaurants/:id", async (req, res) => {
    console.log(req.params.id)
    try{
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
            [req.params.id]
        );
        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [req.params.id]
        );
        res.status(200).json({
        status: "success",
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
            }
        })
    }catch (err){
        console.log(err)
    }
});

// Create Restaurants
app.post("/api/v1/getRestaurants", async (req, res) => {
    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
        console.log(results)
        res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
            }
        })
    }catch (err){
        console.log(err)
    }
});

// Update Restaurants
app.put("/api/v1/getRestaurants/:id", async (req, res) =>{
    try{
        const results = await db.query(
            "UPDATE restaurants set name = $1, location =$2, price_range=$3 WHERE id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        console.log(results)
        res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
            }
        })
    }catch (err){
        console.log(err)
    };
});

app.delete("/api/v1/getRestaurants/:id", async (req, res) =>{
    try{
        const results = await db.query(
            "DELETE FROM restaurants where id = $1",
            [req.params.id]
        );
        console.log(results)
        res.status(204).json({
        status: "success",
        })
    }catch (err){
        console.log(err)
    };
});

app.post("/api/v1/getRestaurants/:id/addReview", async (req, res) => {
    try{
        const results = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(results)
        res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
            }
        })
    }catch (err){
        console.log(err)
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});