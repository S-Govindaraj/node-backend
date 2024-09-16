const mongoose = require("mongoose");
const config = require("config");
const connectDB = async () => {
  try {
    let URL;
    if (config.IS_CLUSTERID) {
      URL = `mongodb://localhost:27017/${config.DB_DATABASE}`;
    }

    const conn = await mongoose.connect(URL);

    console.log(
      `MongoDB Connected: ${conn.connection.host} ${config.DB_DATABASE}`
    );
  } catch (error) {
    console.error(error.message);
    throw error;
    process.exit(1);
  }
};

module.exports = connectDB;
