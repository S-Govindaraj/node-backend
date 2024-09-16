const { Role, isNameCheckUnique } = require("../Models/Role");
const  User = require("../Models/User");
exports.getAll = async (req, res) => {
  const authID = req.user.id;
  const name = req.query.name || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let conditions = {};
  if (String(req.query?.status) == "0") {
    conditions = {
      ...conditions,
      status: 0,
    };
  } else {
    conditions = {
      ...conditions,
      status: 1,
    };
  }

  if (name) {
    const nameSearchRegex = new RegExp(name, "i")
    conditions = {
      ...conditions,
      name: { $regex: nameSearchRegex }
    }
  }

  try {
    const count = await Role.countDocuments(conditions)
    const data = await Role.find(conditions)
    if (!data) return res.status(200).json({ message: "No data available!" });

    res.status(200).json({ message: "data have shared!", data, count });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findById(id);
    if (!data) return res.status(200).json({ message: "No data available!" });
    res.status(200).json({ message: "data have shared!", data });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.create = async (req, res) => {
  const authID = req.user.id;  
  try {
    const count = await Role.countDocuments(); 
    await Role.insertMany(roleDocs);
    const newItem = {
      ...req.body,
      createdBy: authID,
      updatedBy: authID,
      roleId: (count + 1)
    }
    const isUniCheck = await isNameCheckUnique(newItem.name);
    if (isUniCheck) {
      return res.status(400).json({
        message: "User Role Already Exists",
      });
    }

    const data = await Role.create(newItem);
    res.status(200).json({ message: "Role has been created", data });
  } catch (err) {
    res.status(500).json({ message: "Error in Saving" });
  }
};

exports.update = async (req, res) => {
  const authID = req.user.id;
  try {
    const id = req.params.id;
    const updatedItem = {
      ...req.body,
      updatedAt: Date.now(),
      updatedBy: authID,
    };

    const isUniCheck = await isNameCheckUnique(updatedItem.name, id);
    if (isUniCheck) {
      return res.status(400).json({
        message: "User Role Already Exists",
      });
    }
    await Role.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    res.status(200).json({ message: "Role has been updated" });
  } catch (err) {
    res.status(500).json({ message: "Error in Updating" });
  }
};

exports.delete = async (req, res) => {
  const authID = req.user.id;
  try {
    const id = req.params.id;
    const deleteItem = {
      status: 0,
      updatedAt: Date.now(),
      updatedBy: authID,
    };
    await Role.findByIdAndUpdate(id, deleteItem);
    res.status(200).json({ message: "Role has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
