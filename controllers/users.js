const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { User } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204);
};

const subscriptionUpdate = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw HttpError(401, " subscription must be 'starter', 'pro' or 'business");
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  res.status(200).json(result);
};

const updateAvatar = async (req, res) => {
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");

  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tmpUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).quality(60).write(resultUpload);
  });

  await fs.unlink(tmpUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout,
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  updateAvatar: ctrlWrapper(updateAvatar),
};
