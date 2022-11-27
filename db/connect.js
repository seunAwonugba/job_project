const mongoose = require("mongoose");

const connectDataBase = (connectionString) => {
    return mongoose.connect(connectionString);
};

module.exports = { connectDataBase };
