const testUserController = (req, res) => {
    try {
        res.status(200).send({ 
            success: true,
            message: 'Test user data fetch successfully'
        });
    } catch (error) {
        console.log(`Error in test API: ${error}`);
    }
}

module.exports = {
    testUserController
}