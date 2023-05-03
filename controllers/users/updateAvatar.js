const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const { User } = require("../../models");

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
module.exports = updateAvatar;
