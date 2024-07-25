const mongoose = require('mongoose');
const colors = require('colors');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


// function mongodb database connect
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database ${mongoose.connection.host}`.colors.bgCyan);
    } catch (error) {
        console.log("Error connecting", error, colors.bgRed);
    }
}

module.exports = connectDB;