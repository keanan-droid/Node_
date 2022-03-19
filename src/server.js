const express = require('express')

const server = express();

server.listen(3000, () => {
    console.log("Server is running on port:3000");
})