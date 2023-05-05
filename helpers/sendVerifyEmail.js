const sendEmail = require("./sendEmail");

const { BASE_URL } = process.env;
const sendVerifyEmail = (user) => {
  const verifyEmail = {
    to: user.email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };
  sendEmail(verifyEmail);
};

module.exports = sendVerifyEmail;
