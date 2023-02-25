const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");

// @desc: Get goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find();
    res.status(200).json(goals);
});

// @desc: Set goals
// @route: POST /api/goals
// @access: Private
const setGoals = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        // return res.status(400).json({msg: "Please add a text field"})
        throw new Error("Please add a text field");
    }
    const goal = await goalModel.create({ text });
    res.status(200).json(goal);
});

// @desc: Update goals
// @route: PUT /api/goals/:id
// @access: Private
const updateGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await goalModel.findById(id);
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await goalModel.findByIdAndUpdate(id, req.body, {new: true});
    console.log(goal, updatedGoal);
    res.status(200).json(updatedGoal);
});

// @desc: Delete goals
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await goalModel.findById(id);
    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    await goal.remove();
    res.status(200).json({id});
});

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
};
