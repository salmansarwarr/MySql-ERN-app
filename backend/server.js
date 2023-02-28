const express = require("express");
const dotenv = require("dotenv").config();
const colors = require('colors');
const goalsRouter = require("./routes/goals");
const usersRouter = require("./routes/user");
const {errorHandler} = require("./middleware/error");
const connectDB = require('./config/db');
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
