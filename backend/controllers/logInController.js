const User = require("../models/User");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const logIn = async (req, res) => {
  const validatedBody = signinBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(411).json({ message: "Incorrect Inputs!" });
  }
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId: userId }, JWT_SECRET);
    res.status(200).json({
      message: "Login Successful!",
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in..",
  });
};

module.exports = logIn;
