const asyncHandler = require('express-async-handler');

// @desc: Get goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get goals"});
})

// @desc: Set goals
// @route: POST /api/goals
// @access: Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        // return res.status(400).json({msg: "Please add a text field"})
        throw new Error('Please add a text field') 
    }
    console.log(req.body);
    res.status(200).json({message: "Set goals"});
})

// @desc: Update goals
// @route: PUT /api/goals/:id
// @access: Private
const updateGoals = asyncHandler(async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `Update goal ${id}`});
})

// @desc: Delete goals
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler(async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `delete goal ${id}`});
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}