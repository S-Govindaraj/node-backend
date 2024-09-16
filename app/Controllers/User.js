// controllers/userController.js
const User = require('../Models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
    const data = await User.find({}).skip(skip).limit(limit);
    const total = await User.countDocuments({});
    res.json({
      data,
      total,
      page,
      pages: Math.ceil(total / limit), // Calculate total pages
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};
