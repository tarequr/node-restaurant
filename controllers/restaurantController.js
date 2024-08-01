const restaurantModel = require("../models/restaurantModel");

/* CREATE RESTAURANT CONTROLLER */
const createRestaurantController = async(req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

        /* Validation */
        if (!title || !coords) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide all required information'
            });
        }

        const newResturat = new restaurantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords });
        await newResturat.save();

        res.status(200).send({
            success: true,
            message: 'New restaurant created successfully',
            newResturat
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Create Restaurant API: ${error.message}`,
            error
        });
    }
}

/* GET RESTAURANT CONTROLLER */
const getAllRestaurantController = async(req, res) => {
    try {
        const restaurants = await restaurantModel.find({});

        if (!restaurants) {
            return res.status(404).send({ 
                success: false,
                message: 'No restaurant available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Get All restaurants API: ${error.message}`,
            error
        });
    }
}

module.exports = { createRestaurantController, getAllRestaurantController }