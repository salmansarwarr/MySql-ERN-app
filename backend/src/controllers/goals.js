const asyncHandler = require('express-async-handler');
const db = require('../config/db');
const connectDB = require('../config/db');

// @desc: Get goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler(async (req, res) => {
    const query1 = `SELECT * FROM goals WHERE user = ${req.user};`;
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query1');
        } else {
            res.status(200).json(result);
        }
    }); 
});

// @desc: Set goals
// @route: POST /api/goals
// @access: Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error('Please add a text field');
    }
    const query1 = `INSERT INTO goals (user, text, createdAt, updatedAt) 
        VALUES (
            ${req.user},
            '${req.body.text}',
            CURRENT_TIME(),
            CURRENT_TIME()
        )`;
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            console.log('One goal inserted');
        }
    });

    const query2 = `SELECT * FROM goals WHERE user = ${req.user} ORDER BY _id DESC LIMIT 1;`;
    connectDB.query(query2, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query3');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// @desc: Update goals
// @route: PUT /api/goals/:id
// @access: Private
const updateGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check for goal and valid user
    const query1 = `SELECT * FROM goals WHERE _id = ${id}`
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query1');
        } else {
            if(result.length == 0) {
                res.status(401);
                throw new Error('Goal not found');
            }
            else if(result[0].user != req.user){
                res.status(400);
                throw new Error('User not authorized');
            } 
        }
    });

    const query2 = `UPDATE goals SET text = '${req.body.text}' WHERE _id = ${id} AND user = ${req.user};`
    connectDB.query(query2, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            console.log(`One goal updated`);
        }
    });

    const query3 = `SELECT * FROM goals WHERE user = ${req.user} AND _id = ${id};`;
    connectDB.query(query3, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query3');
        } else {
            console.log(result[0]);
            res.status(200).json(result[0]);
        }
    });
});

// @desc: Delete goals
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check for goal and valid user
    const query1 = `SELECT * FROM goals WHERE _id = ${id}`
    connectDB.query(query1, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query1');
        } else {
            if(result.length == 0) {
                res.status(401);
                throw new Error('Goal not found');
            }
            else if(result[0].user != req.user){
                res.status(400);
                throw new Error('User not authorized');
            } 
        }
    });

    const query2 = `DELETE FROM goals WHERE _id = ${id};`;
    connectDB.query(query2, (err, result) => {
        if (err) {
            res.status(400);
            throw new Error('Error in query2');
        } else {
            console.log('One goal deleted');
        }
    });

    res.status(200).json({ id });
});

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
};
