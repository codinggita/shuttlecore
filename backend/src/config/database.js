const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shuttlecore')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
};

module.exports = connectDB;
