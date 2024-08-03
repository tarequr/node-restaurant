const foodModel = require("../models/foodModel");

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

// /* UPDATE CATEGORY CONTROLLER */
// const updateCategoryController = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, imageUrl } = req.body;

//         const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
       
//         if (!updateCategory) {
//             return res.status(500).send({ 
//                 success: false,
//                 message: 'No category available'
//             });
//         }

//         res.status(200).send({
//             success: true,
//             message: 'Category updated successfully',
//             updateCategory
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: `Error In Update Categories API: ${error.message}`,
//             error
//         });
//     }
// }

// /* DELETE CATEGORY CONTROLLER */
// const deleteCategoryController = async(req, res) => {
//     try {
//         if (!req.params.id) {
//             return res.status(404).send({ 
//                 success: false,
//                 message: 'Please provide restaurant id.'
//             }); 
//         }

//         await categoryModel.findByIdAndDelete(req.params.id);
        
//         res.status(200).send({
//             success: true,
//             message: 'Category deleted successfully'
//         });
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: `Error In Delete Categories API: ${error.message}`,
//             error
//         });
//     }
// }


module.exports = { createFoodController, getAllFoodController }