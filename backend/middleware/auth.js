const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const connectDB = require('../config/db');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            // req.user = await userModel.findById(decoded.id).select('-password');
            const query1 = `SELECT * FROM users WHERE _id = ${decoded.id}`;
            connectDB.query(query1, async (err, result) => {
                if (err) {
                    res.status(400);
                    throw new Error('Error in query1');
                } else if (result) {
                    return result;
                }
            });

            req.user = decoded.id;
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

module.exports = { protect };
