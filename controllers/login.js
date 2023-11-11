const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign({ user_id: user.id }, "token", {
    expiresIn: "2h",
  });
  console.log(token, "token");

  response.status(200).send({
    token: token,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    id: user._id,
    resetLink: user.resetLink,
  });
});

module.exports = loginRouter;
