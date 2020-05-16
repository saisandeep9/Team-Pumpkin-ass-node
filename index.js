const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const error = require("./middleware/errors");
require("express-async-errors");

// middle ware funcations
// app.use(express.json());
// app.use(bodyParser.json());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));

// app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(console.log("Successfully connected to mongodb host"))
  .catch((err) => console.log("faile to connect to db...", err));

const users = require("./routes/users");
const auth = require("./routes/auth");
const categories = require("./routes/categories");
const image = require("./routes/images");

app.use("/api", users);
app.use("/api", auth);
app.use("/api", categories);
app.use("/api", image);
// app.use(error);

const port = process.env.PORT || 9630;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
