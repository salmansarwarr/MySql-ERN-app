const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');
const goalsRouter = require('./src/routes/goals');
const usersRouter = require('./src/routes/user');
const { errorHandler } = require('./src/middleware/error');
const connectDB = require('./src/config/db');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', goalsRouter);
app.use('/api/users', usersRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
            (err) => {
                res.status(500).send(err);
            }
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

connectDB.connect((err) => {
    if (err) {
        console.log('error connecting: ', err.stack);
        return;
    } else {
        console.log('connected to mysql');
    }
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
