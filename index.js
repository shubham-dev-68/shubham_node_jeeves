require("dotenv").config();

const cors = require("cors");
const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const {sequelize} = require('./models')

app.use(cors()); //for no domain restriction
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.listen(port, () => {
  console.log("Server is up on port " + port);
  // sequelize sync force true for the time being to clear the models till its finalized
  sequelize.sync({ "force": true });
});