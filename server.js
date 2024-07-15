const express = require('express');

//rest object
const app = express();

//route
//URL => http://localhost:8080
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Food Server</h1>");
});


//PORT => 8080
const PORT = 8080;

//listen
app.listen(PORT, (req, res) => {
    console.log(`Server running on ${PORT}`);
});