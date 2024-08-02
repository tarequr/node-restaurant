const categoryModel = require("../models/categoryModel");

/* CREATE CATEGORY CONTROLLER */
const createCategoryController = async(req, res) => {
    try {
        const { title, imageUrl } = req.body;

        /* Validation */
        if (!title ) {
            return res.status(404).send({ 
                success: false,
                message: 'Please provide all required information'
            });
        }

        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();

        res.status(200).send({
            success: true,
            message: 'New category created successfully',
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Delete Restaurant API: ${error.message}`,
            error
        });
    }
}

module.exports = { createCategoryController }