const userModel = require('../models/userModel');

/**
 * callback function - Get all users
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getUsers = async (req, res) => {
    try {
        const data = await userModel.find();
        if (data.length > 0) {
            res.status(200).json({
                message: 'User Data Fetched',
                data: data
            });
        } else {
            res.status(404).json({
                message: 'No Users Data'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/**
 * callback function - Add new User
 * @param {object} req 
 * @param {object} res 
 * 
 */
const addUser = async (req, res) => {
    const newUserData = new userModel(req.body);
    try {
        await newUserData.save();
        res.status(200).json({
            message: 'New user added successfully',
            data: newUserData
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Get a Specific user's Data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getSpecificUser = async (req, res) => {
    try {
        const specificUser = await userModel.findById(req.params.user_id);
        if (specificUser !== null) {
            res.status(200).json({
                message: 'Fetched specific users data',
                data: specificUser
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Delete a Specific user's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete({ _id: req.params.user_id });
        if (deletedUser) {
            res.status(200).json({
                message: "User's data deleted",
                data: deletedUser
            });
        } else {
            res.status(404).json({
                message: "User not Found"
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Update a Specific user's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const updateUser = async (req, res) => {
    const { user_id: _id } = req.params; //Extracting user_id & giving a name _id at the same time
    const updateUserData = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(_id, updateUserData, { new: true });
        if (updatedUser !== null) {
            res.status(200).json({
                message: "User's data Updated",
                data: updatedUser
            });
        }else{
            res.status(404).json({
                message: 'User not Found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports = { getUsers, addUser, getSpecificUser, deleteUser, updateUser };