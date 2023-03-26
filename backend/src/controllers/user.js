const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const connectDB = require('../config/db');

// @desc: Register new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const query1 = `SELECT COUNT(1) FROM users WHERE email='${email}';`;
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query1');
        } else if (result[0]['COUNT(1)'] != 0) {
            res.status(400);
            throw new Error('User alreasy exists');
        }
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const query2 = `INSERT INTO users (name, email, password, createdAt, updatedAt)
                    VALUES ('${name}', '${email}', '${hashedPassword.toString()}', CURRENT_TIME(), CURRENT_TIME());`;

    connectDB.query(query2, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            console.log('One user registered');
        }
    });

    const query3 = `SELECT * FROM users WHERE email = '${email}'`;
    connectDB.query(query3, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            if (result) {
                const user = result[0];
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        }
    });
});

// @desc: Authenticate new user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const query1 = `SELECT * FROM users WHERE email = '${email}'`;
    connectDB.query(query1, async (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query1');
        } else if (
            result.length != 0 &&
            (await bcrypt.compare(password, result[0].password))
        ) {
            const user = result[0];
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid credentials');
        }
    });
});

// @desc: Get user data
// @route: POST /api/users/me
// @access: Public
const getMe = asyncHandler(async (req, res) => {
    const query1 = `SELECT * FROM users WHERE _id = '${req.user}'`;
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            if (result) {
                res.status(200).json(result[0]);
            } else {
                res.status(400);
                throw new Error('Some error occured');
            }
        }
    });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
