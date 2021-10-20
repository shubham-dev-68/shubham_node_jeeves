require("dotenv").config();

const cors = require("cors");
const express = require("express")
const app = express();
const port = process.env.PORT || 5007;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.listen(port, () => {
  console.log("Server is up on port " + port);
});