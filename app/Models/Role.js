const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    roleId: {
        type: Number,
        default: null
      },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

schema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "role",
});

const Role = mongoose.model("role", schema);

const isNameCheckUnique = async (nameInput, id) => {
  const name = new RegExp(`^${nameInput}$`, "i");
  if (id) {
    return await Role.findOne({
      name,
      _id: { $ne: id },
    });
  }
  return await Role.findOne({
    name,
  });
};

module.exports = { Role, isNameCheckUnique };
