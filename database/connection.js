const mongoose = require("mongoose");

//database connection
const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to database");
  }
};

module.exports = {
  connection,
};
