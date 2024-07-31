const restaurantModel = require("../models/restaurantModel");

/* CREATE RESTURANT CONTROLLER */
const createResturantController = async(req, res) => {
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
            message: 'New resturant created successfully',
            newResturat
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Create Resturant API: ${error.message}`,
            error
        });
    }
}

module.exports = { createResturantController }