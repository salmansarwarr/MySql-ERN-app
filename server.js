const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const goalsRouter = require("./routes/goals");
const usersRouter = require("./routes/user");
const { errorHandler } = require("./middleware/error");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalsRouter);
app.use("/api/users", usersRouter);

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.join(__dirname, "./frontend/build/index.html"), (err) => {
                res.status(500).send(err);
            }
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
