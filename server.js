const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect success!");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
