const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

const signUp = async (req, res) => {
  const validatedBody = signupBody.safeParse(req.body);
  if (!validatedBody.success) {
    return res
      .status(411)
      .json({ message: "Error while logging in. Incorrect Inputs.." });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({ message: "User already present.." });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = user._id;

  const token = jwt.sign({ userId: userId }, JWT_SECRET);

  res.status(200).json({
    message: "User succesfully created!",
    token: token,
  });
};

module.exports = signUp;
