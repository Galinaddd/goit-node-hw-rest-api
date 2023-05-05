const { HttpError, sendVerifyEmail } = require("../../helpers");
const { User } = require("../../models");

const { BASE_URL } = process.env;

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  //   const verifyEmail = {
  //     to: email,

  //     subject: "Verify email",
  //     html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  //   };

  sendVerifyEmail(user);
  res.status(200), json({ message: "Verification email sent" });
};

module.exports = resentVerifyEmail;
