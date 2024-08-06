const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

/* CREATE FOOD CONTROLLER */
const createFoodController = async(req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating } = req.body;

        /* Validation */
        if (!title || !description || !price || !restaurant) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide all required information'
            });
        }

        const newFood = new foodModel({ title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating });
        await newFood.save();

        res.status(200).send({
            success: true,
            message: 'New food created successfully',
            newFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Create Category API: ${error.message}`,
            error
        });
    }
}

/* GET ALL FOODS CONTROLLER */
const getAllFoodController = async(req, res) => {
    try {
        const foods = await foodModel.find({});

        if (!foods) {
            return res.status(404).send({ 
                success: false,
                message: 'No food available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Get All Foods API: ${error.message}`,
            error
        });
    }
}

/* GET SINGLE FOOD CONTROLLER */
const getSingleFoodController = async(req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide food id.'
            }); 
        }

        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).send({ 
                success: false,
                message: 'No food available'
            });
        }

        res.status(200).send({
            success: true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Get Single Food API: ${error.message}`,
            error
        });
    }
}

/* GET BY RESTAURANT CONTROLLER */
const getByRestaurantController = async(req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide food id.'
            }); 
        }

        const food = await foodModel.find({ restaurant : req.params.id });

        if (!food) {
            return res.status(404).send({ 
                success: false,
                message: 'No food available'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Food based on restaurant',
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Get By Restaurant API: ${error.message}`,
            error
        });
    }
}

/* UPDATE FOOD CONTROLLER */
const updateFoodController = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide food id.'
            }); 
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(500).send({ 
                success: false,
                message: 'No food available'
            });
        }

        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating } = req.body;
        
        const updateFood = await foodModel.findByIdAndUpdate(id, { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating }, { new: true });
        
        res.status(200).send({
            success: true,
            message: 'Food updated successfully',
            updateFood
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Update Food API: ${error.message}`,
            error
        });
    }
}

/* DELETE FOOD CONTROLLER */
const deleteFoodController = async(req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide food id.'
            }); 
        }

        await foodModel.findByIdAndDelete(req.params.id);
        
        res.status(200).send({
            success: true,
            message: 'Food deleted successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Delete Food API: ${error.message}`,
            error
        });
    }
}

/* PLACE ORDER CONTROLLER */
const placeOrderController = async(req, res) => {
    try {
        const { cart } = req.body;

        if (!cart) {
            return res.status(500).send({ 
                success: false,
                message: 'Please provide food cart.'
            }); 
        }

        let total = 0;

        //calculation
        cart.map((item) => {
            total += item.price;
        });

        const newOder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        });

        await newOder.save();

        return res.status(201).send({ 
            success: true,
            message: 'Order placed successfully.',
            newOder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Place Order API: ${error.message}`,
            error
        });
    }
}

/* ORDER STATUS CONTROLLER */
const orderStatusController = async(req, res) => {
    try {
        const orderId = req.params.id;
        
        if (!orderId) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide order id.'
            }); 
        }

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).send({ 
            success: true,
            message: 'Order Status Updated.',
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Order Status API: ${error.message}`,
            error
        });
    }
}

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }