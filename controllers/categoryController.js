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
            message: `Error In Create Category API: ${error.message}`,
            error
        });
    }
}

/* CREATE CATEGORY CONTROLLER */
const getAllCategoryController = async(req, res) => {
    try {
        const categories = await categoryModel.find({});

        if (!categories) {
            return res.status(404).send({ 
                success: false,
                message: 'No category available'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Get All Categories API: ${error.message}`,
            error
        });
    }
}

/* UPDATE CATEGORY CONTROLLER */
const updateCategoryController = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
       
        if (!updateCategory) {
            return res.status(500).send({ 
                success: false,
                message: 'No category available'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            updateCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Update Categories API: ${error.message}`,
            error
        });
    }
}

module.exports = { createCategoryController, getAllCategoryController, updateCategoryController }