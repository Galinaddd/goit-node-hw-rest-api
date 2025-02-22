const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  console.log("Verifying email");
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
