const express = require("express");
const dotenv = require("dotenv").config();
const goalsRouter = require("./routes/goals");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalsRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
