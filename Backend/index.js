const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const authRoute = require("./Router/authRoute");
require("./DB/db.js");
app.use(express.json());
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authRoute);
app.listen(port, () => console.log(`App is listening on port ${port}!`));
