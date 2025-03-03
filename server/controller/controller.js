const mongoose = require('mongoose');
const Userdb = require('../model/model');

// Create and save new user
exports.create = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Content cannot be empty!" });
        }

        // Create a new user instance
        const user = new Userdb({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        });

        // Save user in the database
        const savedUser = await user.save();
        res.redirect('/add-user'); // Redirect after success
    } catch (err) {
        console.error("Error in create:", err);
        res.status(500).send({ message: err.message || "Error creating user" });
    }
};

// Retrieve and return all users / retrieve and return a single user
exports.find = async (req, res) => {
    try {
        if (req.params.id) {  // Fetch single user by ID
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).send({ message: "Invalid user ID" });
            }

            const user = await Userdb.findById(req.params.id);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            return res.send(user);
        }

        // Fetch all users
        const users = await Userdb.find();
        res.send(users);
    } catch (err) {
        console.error("Error in find:", err);
        res.status(500).send({ message: err.message || "Error retrieving user(s)" });
    }
};

// Update an identified user by user ID
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Data to update cannot be empty" });
        }

        const updatedUser = await Userdb.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: `Cannot update user with ID ${id}. User not found!` });
        }
        res.send(updatedUser);
    } catch (err) {
        console.error("Error in update:", err);
        res.status(500).send({ message: "Error updating user information" });
    }
};

// Delete a user with the specified user ID
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const deletedUser = await Userdb.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ message: `Cannot delete user with ID ${id}. Maybe ID is incorrect` });
        }
        res.send({ message: "User was deleted successfully!" });
    } catch (err) {
        console.error("Error in delete:", err);
        res.status(500).send({ message: `Could not delete User with ID ${id}` });
    }
};
