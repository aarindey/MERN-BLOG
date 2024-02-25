const User = require("../models/User");

const validateTokenController = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(403).json({ success: false, error: "User not found" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "User found", data: user });
    }
  } catch (error) {
    return res.status(403).json({ success: false, error: "User not found" });
  }
};

module.exports = validateTokenController;
