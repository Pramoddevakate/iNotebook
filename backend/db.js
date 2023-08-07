const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/inotebook";
const connectTOmongo = () => {
    mongoose
    .connect(mongoURI)
    .catch (error => console.log(error));
};

module.exports = connectTOmongo;
